import Groq from "groq-sdk";
import { PrismaClient, Level, ExerciseType, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Mandarin Chinese" },
  { code: "pt", name: "Portuguese" },
];

const LEVELS = [
  { code: Level.BEGINNER, name: "Beginner" },
  { code: Level.BASIC, name: "Basic" },
  { code: Level.INTERMEDIATE, name: "Intermediate" },
  { code: Level.ADVANCED, name: "Advanced" },
  { code: Level.FLUENT, name: "Fluent" },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const buildPrompt = (
  language: string,
  level: string,
  moduleIndex: number,
  totalModules: number,
) => `
You are a language curriculum designer. Generate exactly 1 learning module (module ${moduleIndex} of ${totalModules}) for students learning ${language} at ${level} level.

STRICT RULES:
- All questions and content must be appropriate for ${level} level
- For TRANSLATE exercises: questions should be in Portuguese (Brazilian), answers in ${language}
- For MULTIPLE_CHOICE: provide exactly 4 options as an array of strings
- For FILL_IN_THE_BLANK: provide exactly 4 options as an array of strings OR null if text input
- For ORDER_WORDS: provide words as shuffled array, answer is the correct sentence
- For FREE_WRITE: options must be null, answer is a sample correct response
- The module must have exactly 3 lessons
- Each lesson must have exactly 5 exercises, one of each type: MULTIPLE_CHOICE, FILL_IN_THE_BLANK, TRANSLATE, FREE_WRITE, ORDER_WORDS
- Topic for this module should be different from other modules (use topic number ${moduleIndex}: ${getTopicForIndex(moduleIndex)})

Respond ONLY with a valid JSON object, no markdown, no explanation, no extra text.

JSON format:
{
  "title": "Module title in Portuguese",
  "description": "Module description in Portuguese",
  "lessons": [
    {
      "title": "Lesson title in Portuguese",
      "description": "Lesson description in Portuguese",
      "exercises": [
        {
          "type": "MULTIPLE_CHOICE",
          "question": "Question text",
          "answer": "correct option",
          "options": ["option1", "option2", "option3", "option4"]
        },
        {
          "type": "FILL_IN_THE_BLANK",
          "question": "Sentence with _____",
          "answer": "correct word",
          "options": ["word1", "word2", "word3", "word4"]
        },
        {
          "type": "TRANSLATE",
          "question": "Traduza: 'Portuguese phrase here'",
          "answer": "translation in ${language}",
          "options": null
        },
        {
          "type": "FREE_WRITE",
          "question": "Open ended question",
          "answer": "sample correct answer",
          "options": null
        },
        {
          "type": "ORDER_WORDS",
          "question": "Ordene as palavras:",
          "answer": "correct full sentence",
          "options": ["word1", "word2", "word3", "word4"]
        }
      ]
    }
  ]
}
`;

const TOPICS = [
  "Greetings and introductions",
  "Family and relationships",
  "Food and drinks",
  "Travel and transportation",
  "Work and career",
  "Health and body",
  "Shopping and money",
  "Weather and seasons",
  "Hobbies and free time",
  "Culture and traditions",
];

const getTopicForIndex = (index: number) => TOPICS[index - 1] ?? TOPICS[0];

interface ExerciseData {
  type: string;
  question: string;
  answer: string;
  options: string[] | null;
}

interface LessonData {
  title: string;
  description: string;
  exercises: ExerciseData[];
}

interface ModuleData {
  title: string;
  description: string;
  lessons: LessonData[];
}

const generateModule = async (
  languageName: string,
  level: Level,
  levelName: string,
  moduleIndex: number,
): Promise<ModuleData> => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: buildPrompt(languageName, levelName, moduleIndex, 10),
      },
    ],
    temperature: 0.7,
    max_tokens: 3000,
  });

  const raw = completion.choices[0]?.message?.content ?? "";
  const clean = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  return JSON.parse(clean);
};

const insertModules = async (
  modules: ModuleData[],
  language: string,
  level: Level,
) => {
  for (let i = 0; i < modules.length; i++) {
    const mod = modules[i];

    await prisma.module.create({
      data: {
        language,
        level,
        order: i + 1,
        title: mod.title,
        description: mod.description,
        lessons: {
          create: mod.lessons.map((lesson, lessonIndex) => ({
            title: lesson.title,
            description: lesson.description,
            order: lessonIndex + 1,
            exercises: {
              create: lesson.exercises.map((exercise, exerciseIndex) => ({
                type: exercise.type as ExerciseType,
                question: exercise.question,
                answer: exercise.answer,
                options: exercise.options ?? Prisma.JsonNull,
                order: exerciseIndex + 1,
              })),
            },
          })),
        },
      },
    });
  }
};

const main = async () => {
  const TARGET_LANGUAGE = "it";

  console.log(`🚀 Gerando seed para: ${TARGET_LANGUAGE.toUpperCase()}\n`);

  const language = LANGUAGES.find((l) => l.code === TARGET_LANGUAGE);
  if (!language) {
    console.error(`❌ Idioma '${TARGET_LANGUAGE}' não encontrado!`);
    process.exit(1);
  }

  const MODULES_PER_LEVEL = 10;
  let success = 0;
  let errors = 0;

  for (const level of LEVELS) {
    console.log(`\n📚 ${language.code.toUpperCase()} / ${level.name}`);

    for (let moduleIndex = 1; moduleIndex <= MODULES_PER_LEVEL; moduleIndex++) {
      try {
        const existing = await prisma.module.findFirst({
          where: {
            language: language.code,
            level: level.code,
            order: moduleIndex,
          },
        });

        if (existing) {
          console.log(
            `  [${moduleIndex}/10] ⏭️  Módulo ${moduleIndex} já existe, pulando...`,
          );
          continue;
        }

        process.stdout.write(
          `  [${moduleIndex}/10] Gerando módulo ${moduleIndex}... `,
        );

        const mod = await generateModule(
          language.name,
          level.code,
          level.name,
          moduleIndex,
        );

        await prisma.module.create({
          data: {
            language: language.code,
            level: level.code,
            order: moduleIndex,
            title: mod.title,
            description: mod.description,
            lessons: {
              create: mod.lessons.map((lesson, lessonIndex) => ({
                title: lesson.title,
                description: lesson.description,
                order: lessonIndex + 1,
                exercises: {
                  create: lesson.exercises.map((exercise, exerciseIndex) => ({
                    type: exercise.type as ExerciseType,
                    question: exercise.question,
                    answer: exercise.answer,
                    options: exercise.options ?? Prisma.JsonNull,
                    order: exerciseIndex + 1,
                  })),
                },
              })),
            },
          },
        });

        success++;
        console.log(`✅ ${mod.title}`);
      } catch (err) {
        errors++;
        console.log(`❌ Erro: ${err instanceof Error ? err.message : err}`);
      }

      await delay(2500);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`🎉 Concluído para ${language.code.toUpperCase()}!`);
  console.log(`✅ Sucesso: ${success} módulos`);
  if (errors > 0) console.log(`❌ Erros: ${errors} módulos`);
  console.log("=".repeat(50));
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

//   Amanhã:    es → yarn seed:generate (TARGET_LANGUAGE = "es") => feito
// Dia 3:     fr → yarn seed:generate (TARGET_LANGUAGE = "fr") => feito
// Dia 4:     de → yarn seed:generate (TARGET_LANGUAGE = "de") => feito
// Dia 5:     it → yarn seed:generate (TARGET_LANGUAGE = "it") =>
// Dia 6:     ja → yarn seed:generate (TARGET_LANGUAGE = "ja")
// Dia 7:     zh → yarn seed:generate (TARGET_LANGUAGE = "zh")
// Dia 8:     pt → yarn seed:generate (TARGET_LANGUAGE = "pt")
