import { PrismaClient, Level, ExerciseType, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.module.create({
    data: {
      language: "en",
      level: Level.BEGINNER,
      order: 1,
      title: "Primeiros Passos",
      description: "Saudações, apresentações e vocabulário essencial.",
      lessons: {
        create: [
          {
            title: "Saudações Básicas",
            order: 1,
            description: "Como cumprimentar pessoas em inglês.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "Good morning",
                  options: [
                    "Good morning",
                    "Good night",
                    "Good afternoon",
                    "Hello",
                  ],
                  question: "Como se diz 'Bom dia' em inglês?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "Good afternoon",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'Boa tarde'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "Good",
                  options: ["Good", "Fine", "Nice", "Great"],
                  question: "_____ evening! How are you?",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "How are you ?",
                  options: ["you", "are", "How", "?"],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "My name is",
                  options: Prisma.JsonNull,
                  question: "Escreva como você se apresentaria em inglês.",
                },
              ],
            },
          },
          {
            title: "Apresentações Pessoais",
            order: 2,
            description:
              "Aprenda a se apresentar e perguntar o nome de alguém.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "What is your name?",
                  options: [
                    "What is your name?",
                    "Where are you from?",
                    "How old are you?",
                    "How are you?",
                  ],
                  question: "Como perguntar 'Qual é o seu nome?'",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "My name is Ana",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'Meu nome é Ana'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "from",
                  options: ["from", "of", "in", "at"],
                  question: "I am _____ Brazil.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "Nice to meet you",
                  options: ["you", "meet", "Nice", "to"],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "I am from",
                  options: Prisma.JsonNull,
                  question: "Escreva de onde você é em inglês.",
                },
              ],
            },
          },
          {
            title: "Números de 1 a 20",
            order: 3,
            description: "Aprenda a contar em inglês.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "Seven",
                  options: ["Seven", "Seventeen", "Seventy", "Six"],
                  question: "Como se escreve o número 7 em inglês?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "fifteen",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'quinze'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "twelve",
                  options: ["twelve", "twenty", "two", "eleven"],
                  question: "I have _____ apples. (12)",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "I have ten books",
                  options: ["have", "ten", "I", "books"],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 5,
                  answer: "twenty",
                  options: ["twelve", "twenty", "two", "eleven"],
                  question: "Como se diz 20 em inglês?",
                },
              ],
            },
          },
          {
            title: "Cores e Formas",
            order: 4,
            description: "Aprenda cores básicas em inglês.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "Blue",
                  options: ["Blue", "Green", "Red", "Yellow"],
                  question: "Qual é a tradução de 'azul'?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "The sky is blue",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'O céu é azul'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "red",
                  options: ["red", "blue", "green", "black"],
                  question: "The apple is _____.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "My favorite color is green",
                  options: ["color", "green", "My", "favorite", "is"],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "My favorite color is",
                  options: Prisma.JsonNull,
                  question: "Escreva qual é a sua cor favorita em inglês.",
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.module.create({
    data: {
      language: "en",
      level: Level.BEGINNER,
      order: 2,
      title: "Família e Pessoas",
      description: "Vocabulário sobre família, profissões e pessoas ao redor.",
      lessons: {
        create: [
          {
            title: "Membros da Família",
            order: 1,
            description: "Aprenda os nomes dos membros da família.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "mother",
                  options: ["mother", "sister", "aunt", "grandmother"],
                  question: "Como se diz 'mãe' em inglês?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "brother",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'irmão'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "father",
                  options: ["father", "uncle", "brother", "son"],
                  question: "My _____ is a doctor. (pai)",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "I have two sisters",
                  options: ["have", "two", "I", "sisters"],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "My family has",
                  options: Prisma.JsonNull,
                  question: "Descreva sua família em inglês.",
                },
              ],
            },
          },
          {
            title: "Profissões Comuns",
            order: 2,
            description: "Como falar sobre profissões em inglês.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "teacher",
                  options: ["teacher", "doctor", "engineer", "lawyer"],
                  question: "Como se diz 'professor' em inglês?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "She is a nurse",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'Ela é enfermeira'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "doctor",
                  options: ["doctor", "teacher", "pilot", "chef"],
                  question: "He works at a hospital. He is a _____.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "My brother is an engineer",
                  options: ["brother", "an", "My", "is", "engineer"],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "I want to be a",
                  options: Prisma.JsonNull,
                  question: "Escreva qual profissão você quer ter.",
                },
              ],
            },
          },
          {
            title: "Adjetivos Descritivos",
            order: 3,
            description: "Descreva pessoas usando adjetivos.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "tall",
                  options: ["tall", "short", "fat", "thin"],
                  question: "Como se diz 'alto' em inglês?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "She is very beautiful",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'Ela é muito bonita'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "young",
                  options: ["young", "old", "tall", "short"],
                  question: "My grandmother is 80. She is not _____.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "He is tall and strong",
                  options: ["tall", "He", "strong", "is", "and"],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "I am",
                  options: Prisma.JsonNull,
                  question: "Descreva como você é fisicamente em inglês.",
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.module.create({
    data: {
      language: "en",
      level: Level.BEGINNER,
      order: 3,
      title: "Cotidiano Básico",
      description: "Alimentos, lugares e objetos do dia a dia.",
      lessons: {
        create: [
          {
            title: "Alimentos e Bebidas",
            order: 1,
            description: "Vocabulário essencial sobre comida e bebida.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "water",
                  options: ["water", "juice", "milk", "coffee"],
                  question: "Como se diz 'água' em inglês?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "I like bread and butter",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'Eu gosto de pão e manteiga'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "hungry",
                  options: ["hungry", "thirsty", "tired", "happy"],
                  question: "I want to eat. I am _____.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "I drink coffee every morning",
                  options: ["coffee", "drink", "I", "morning", "every"],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "My favorite food is",
                  options: Prisma.JsonNull,
                  question: "Escreva qual é sua comida favorita.",
                },
              ],
            },
          },
          {
            title: "Lugares na Cidade",
            order: 2,
            description: "Nomes de lugares comuns na cidade.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "hospital",
                  options: ["hospital", "school", "bank", "park"],
                  question: "Onde os médicos trabalham?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "The supermarket is near my house",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'O supermercado é perto da minha casa'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "school",
                  options: ["school", "hospital", "bank", "church"],
                  question: "Children study at a _____.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "The park is very beautiful",
                  options: ["beautiful", "park", "very", "The", "is"],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "I live near a",
                  options: Prisma.JsonNull,
                  question: "Descreva onde você mora em inglês.",
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.module.create({
    data: {
      language: "en",
      level: Level.BASIC,
      order: 1,
      title: "Rotina e Tempo",
      description: "Descreva sua rotina diária e fale sobre o tempo.",
      lessons: {
        create: [
          {
            title: "Minha Rotina Diária",
            order: 1,
            description: "Como descrever atividades do dia a dia.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "Eu acordo às 7h",
                  options: [
                    "Eu acordo às 7h",
                    "Eu durmo às 7h",
                    "Eu como às 7h",
                    "Eu trabalho às 7h",
                  ],
                  question: "O que significa 'I wake up at 7am'?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "I have breakfast every day",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'Eu tomo café da manhã todo dia'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "go",
                  options: ["go", "goes", "going", "went"],
                  question: "I _____ to work by bus every morning.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "I usually sleep at 10pm",
                  options: ["usually", "I", "at", "sleep", "10pm"],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "I wake up at",
                  options: Prisma.JsonNull,
                  question: "Descreva sua rotina matinal em inglês.",
                },
              ],
            },
          },
          {
            title: "Dias da Semana e Meses",
            order: 2,
            description: "Dias da semana e meses do ano.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "Wednesday",
                  options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
                  question: "Qual é o terceiro dia da semana em inglês?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "My birthday is in July",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'Meu aniversário é em julho'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "Friday",
                  options: ["Friday", "Saturday", "Sunday", "Monday"],
                  question: "The day before Saturday is _____.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "Today is Monday the first of March",
                  options: [
                    "Monday",
                    "Today",
                    "March",
                    "is",
                    "first",
                    "the",
                    "of",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "My favorite day is",
                  options: Prisma.JsonNull,
                  question:
                    "Escreva qual é o seu dia favorito da semana e por quê.",
                },
              ],
            },
          },
          {
            title: "Horas e Horários",
            order: 3,
            description: "Como perguntar e dizer as horas.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "What time is it?",
                  options: [
                    "What time is it?",
                    "Where is the clock?",
                    "How long is it?",
                    "When is it?",
                  ],
                  question: "Como perguntar as horas em inglês?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "It is half past three",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'São três e meia'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "quarter",
                  options: ["quarter", "half", "full", "three"],
                  question: "It is a _____ past five. (5:15)",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "The meeting starts at nine o clock",
                  options: [
                    "at",
                    "starts",
                    "nine",
                    "The",
                    "meeting",
                    "o",
                    "clock",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "I usually wake up at",
                  options: Prisma.JsonNull,
                  question:
                    "Escreva a que horas você faz suas atividades principais.",
                },
              ],
            },
          },
          {
            title: "Clima e Estações",
            order: 4,
            description: "Fale sobre o clima e as estações do ano.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "It is raining",
                  options: [
                    "It is raining",
                    "It is sunny",
                    "It is cold",
                    "It is windy",
                  ],
                  question: "Como dizer 'Está chovendo' em inglês?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "Summer is my favorite season",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'O verão é minha estação favorita'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "cold",
                  options: ["cold", "hot", "warm", "cool"],
                  question: "In winter, the weather is very _____.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "It is very hot today",
                  options: ["hot", "very", "today", "It", "is"],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "Today the weather is",
                  options: Prisma.JsonNull,
                  question: "Descreva o clima hoje em inglês.",
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.module.create({
    data: {
      language: "en",
      level: Level.BASIC,
      order: 2,
      title: "Compras e Serviços",
      description: "Aprenda a fazer compras e usar serviços em inglês.",
      lessons: {
        create: [
          {
            title: "No Supermercado",
            order: 1,
            description: "Vocabulário e frases para fazer compras.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "How much does it cost?",
                  options: [
                    "How much does it cost?",
                    "Where is it?",
                    "What is it?",
                    "When is it?",
                  ],
                  question: "Como perguntar o preço de algo?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "I need to buy milk and eggs",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'Eu preciso comprar leite e ovos'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "expensive",
                  options: ["expensive", "cheap", "free", "costly"],
                  question: "This jacket costs $500. It is very _____.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "Can I pay by credit card",
                  options: ["card", "I", "pay", "Can", "credit", "by"],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "I usually buy",
                  options: Prisma.JsonNull,
                  question:
                    "Descreva o que você costuma comprar no supermercado.",
                },
              ],
            },
          },
          {
            title: "No Restaurante",
            order: 2,
            description: "Como pedir comida num restaurante.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "Can I see the menu, please?",
                  options: [
                    "Can I see the menu, please?",
                    "Where is the bathroom?",
                    "How much is the tip?",
                    "Can I have the check?",
                  ],
                  question: "Como pedir o cardápio em inglês?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "I would like a glass of water",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'Eu gostaria de um copo de água'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "bill",
                  options: ["bill", "menu", "order", "table"],
                  question: "Can I have the _____, please? (conta)",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "I will have the grilled chicken please",
                  options: [
                    "chicken",
                    "have",
                    "I",
                    "grilled",
                    "the",
                    "will",
                    "please",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "My favorite restaurant serves",
                  options: Prisma.JsonNull,
                  question: "Descreva seu restaurante favorito em inglês.",
                },
              ],
            },
          },
          {
            title: "Pedindo Direções",
            order: 3,
            description: "Como pedir e dar direções.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "Turn left at the corner",
                  options: [
                    "Turn left at the corner",
                    "Go straight ahead",
                    "Turn right",
                    "Take the first exit",
                  ],
                  question: "O que significa 'Vire à esquerda na esquina'?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "Excuse me, where is the train station?",
                  options: Prisma.JsonNull,
                  question:
                    "Traduza: 'Com licença, onde fica a estação de trem?'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "straight",
                  options: ["straight", "left", "right", "back"],
                  question: "Go _____ ahead and then turn right.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "The bank is next to the post office",
                  options: [
                    "next",
                    "bank",
                    "The",
                    "office",
                    "is",
                    "the",
                    "post",
                    "to",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "To get to my house you need to",
                  options: Prisma.JsonNull,
                  question: "Explique como chegar à sua casa em inglês.",
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.module.create({
    data: {
      language: "en",
      level: Level.BASIC,
      order: 3,
      title: "Saúde e Corpo",
      description: "Vocabulário sobre saúde, corpo e bem-estar.",
      lessons: {
        create: [
          {
            title: "Partes do Corpo",
            order: 1,
            description: "Aprenda as partes do corpo em inglês.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "shoulder",
                  options: ["shoulder", "elbow", "knee", "ankle"],
                  question: "Como se diz 'ombro' em inglês?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "My head hurts",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'Minha cabeça dói'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "throat",
                  options: ["throat", "stomach", "chest", "back"],
                  question: "I have a sore _____. It hurts when I swallow.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "I broke my arm playing football",
                  options: ["my", "broke", "football", "I", "arm", "playing"],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "When I feel sick I usually",
                  options: Prisma.JsonNull,
                  question: "Descreva o que você faz quando está doente.",
                },
              ],
            },
          },
          {
            title: "No Médico",
            order: 2,
            description: "Como se comunicar numa consulta médica.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "I have been feeling unwell for three days",
                  options: [
                    "I have been feeling unwell for three days",
                    "I am sick",
                    "I feel bad",
                    "Something is wrong",
                  ],
                  question:
                    "Qual frase é mais adequada para descrever sintomas ao médico?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "I am allergic to penicillin",
                  options: Prisma.JsonNull,
                  question: "Traduza: 'Sou alérgico à penicilina'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "prescription",
                  options: ["prescription", "medicine", "pill", "tablet"],
                  question: "The doctor gave me a _____ for antibiotics.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "Take two tablets twice a day after meals",
                  options: [
                    "a",
                    "after",
                    "tablets",
                    "Take",
                    "meals",
                    "twice",
                    "two",
                    "day",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "The last time I visited a doctor",
                  options: Prisma.JsonNull,
                  question: "Descreva uma visita ao médico em inglês.",
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.module.create({
    data: {
      language: "en",
      level: Level.INTERMEDIATE,
      order: 1,
      title: "Comunicação e Opiniões",
      description: "Expresse opiniões, concordâncias e discordâncias.",
      lessons: {
        create: [
          {
            title: "Expressando Opiniões",
            order: 1,
            description: "Como expressar sua opinião de forma natural.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "From my point of view",
                  options: [
                    "In my opinion",
                    "I think that",
                    "I believe",
                    "From my point of view",
                  ],
                  question:
                    "Qual expressão é mais formal para dar uma opinião?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer:
                    "I strongly believe that education is the key to success",
                  options: Prisma.JsonNull,
                  question:
                    "Traduza: 'Acredito fortemente que educação é a chave para o sucesso'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "disagree",
                  options: ["disagree", "agree", "think", "believe"],
                  question:
                    "I _____ with your point. I think the opposite is true.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "From my perspective this is not a good idea",
                  options: [
                    "perspective",
                    "a",
                    "From",
                    "not",
                    "this",
                    "my",
                    "is",
                    "idea",
                    "good",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "In my opinion",
                  options: Prisma.JsonNull,
                  question: "Give your opinion about social media in English.",
                },
              ],
            },
          },
          {
            title: "Concordando e Discordando",
            order: 2,
            description: "Aprenda a concordar e discordar educadamente.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "I see your point, but",
                  options: [
                    "I see your point, but",
                    "You are totally wrong",
                    "I disagree completely",
                    "That makes no sense",
                  ],
                  question: "Qual expressão é mais educada para discordar?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "I could not agree more with what you said",
                  options: Prisma.JsonNull,
                  question:
                    "Traduza: 'Não poderia concordar mais com o que você disse'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "valid",
                  options: ["valid", "wrong", "false", "bad"],
                  question: "That is a _____ point. I had not thought of that.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "While I understand your view I think differently",
                  options: [
                    "view",
                    "differently",
                    "I",
                    "While",
                    "I",
                    "think",
                    "understand",
                    "your",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "I agree with you because",
                  options: Prisma.JsonNull,
                  question:
                    "Write a response agreeing or disagreeing: 'Technology makes people less social.'",
                },
              ],
            },
          },
          {
            title: "Fazendo Perguntas Complexas",
            order: 3,
            description: "Como fazer perguntas elaboradas em inglês.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "Could you elaborate on that?",
                  options: [
                    "Could you elaborate on that?",
                    "What do you mean?",
                    "Can you repeat?",
                    "Speak louder please",
                  ],
                  question:
                    "Como pedir para alguém explicar melhor de forma educada?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "What are the main reasons behind this decision?",
                  options: Prisma.JsonNull,
                  question:
                    "Traduza: 'Quais são as principais razões por trás dessa decisão?'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "wondering",
                  options: ["wondering", "thinking", "asking", "questioning"],
                  question: "I was _____ if you could help me with this.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "Would you mind explaining how this works",
                  options: [
                    "how",
                    "Would",
                    "mind",
                    "works",
                    "you",
                    "explaining",
                    "this",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "I would like to ask about",
                  options: Prisma.JsonNull,
                  question:
                    "Write 3 questions you would ask in a job interview in English.",
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.module.create({
    data: {
      language: "en",
      level: Level.INTERMEDIATE,
      order: 2,
      title: "Trabalho e Carreira",
      description: "Vocabulário e frases para o ambiente de trabalho.",
      lessons: {
        create: [
          {
            title: "Entrevista de Emprego",
            order: 1,
            description: "Como se sair bem em uma entrevista em inglês.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "I have five years of experience in marketing",
                  options: [
                    "I have five years of experience in marketing",
                    "I worked before",
                    "I know marketing",
                    "I did marketing",
                  ],
                  question:
                    "Qual resposta é mais profissional para uma entrevista?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer:
                    "My greatest strength is my ability to work under pressure",
                  options: Prisma.JsonNull,
                  question:
                    "Traduza: 'Meu maior ponto forte é minha capacidade de trabalhar sob pressão'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "motivated",
                  options: ["motivated", "tired", "bored", "lazy"],
                  question: "I am highly _____ and always meet my deadlines.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer:
                    "I am looking for a challenging position in a dynamic company",
                  options: [
                    "challenging",
                    "looking",
                    "I",
                    "in",
                    "a",
                    "am",
                    "position",
                    "dynamic",
                    "company",
                    "for",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "My career goal is to",
                  options: Prisma.JsonNull,
                  question:
                    "Answer in English: Where do you see yourself in 5 years?",
                },
              ],
            },
          },
          {
            title: "Reuniões e Apresentações",
            order: 2,
            description: "Como participar de reuniões e fazer apresentações.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "Let us get started",
                  options: [
                    "Let us get started",
                    "We begin now",
                    "Start",
                    "Go",
                  ],
                  question: "Como começar uma reunião de forma profissional?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer:
                    "I would like to draw your attention to the sales figures",
                  options: Prisma.JsonNull,
                  question:
                    "Traduza: 'Gostaria de chamar sua atenção para os números de vendas'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "agenda",
                  options: ["agenda", "schedule", "list", "plan"],
                  question: "Let us go through the _____ for today's meeting.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "To summarize the key points of my presentation",
                  options: [
                    "points",
                    "To",
                    "my",
                    "key",
                    "of",
                    "summarize",
                    "presentation",
                    "the",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "The main objective of this meeting is",
                  options: Prisma.JsonNull,
                  question:
                    "Write an opening statement for a business presentation in English.",
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.module.create({
    data: {
      language: "en",
      level: Level.ADVANCED,
      order: 1,
      title: "Debates e Argumentação",
      description: "Desenvolva argumentos sólidos e debata tópicos complexos.",
      lessons: {
        create: [
          {
            title: "Estruturando Argumentos",
            order: 1,
            description: "Como construir argumentos lógicos e persuasivos.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "Furthermore",
                  options: ["Furthermore", "But", "So", "Also"],
                  question:
                    "Which word best adds a supporting argument in formal writing?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer:
                    "Despite the evidence suggesting otherwise proponents of this view argue that",
                  options: Prisma.JsonNull,
                  question:
                    "Traduza: 'Apesar das evidências sugerirem o contrário, defensores desta visão argumentam que'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "notwithstanding",
                  options: [
                    "notwithstanding",
                    "although",
                    "however",
                    "despite",
                  ],
                  question:
                    "_____ the challenges, the team completed the project on time.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer:
                    "The evidence clearly demonstrates that this policy has failed",
                  options: [
                    "failed",
                    "clearly",
                    "The",
                    "has",
                    "this",
                    "policy",
                    "evidence",
                    "demonstrates",
                    "that",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "The primary argument in favor of",
                  options: Prisma.JsonNull,
                  question:
                    "Write a formal argument for or against remote work. Use at least 3 linking words.",
                },
              ],
            },
          },
          {
            title: "Linguagem Acadêmica",
            order: 2,
            description: "Vocabulário e estruturas para textos acadêmicos.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "The study corroborates previous findings",
                  options: [
                    "The study corroborates previous findings",
                    "The study says the same",
                    "The study agrees",
                    "The study confirms it",
                  ],
                  question:
                    "Which sentence uses the most appropriate academic language?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer:
                    "This phenomenon can be attributed to a confluence of socioeconomic factors",
                  options: Prisma.JsonNull,
                  question:
                    "Traduza: 'Este fenômeno pode ser atribuído a uma confluência de fatores socioeconômicos'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "empirical",
                  options: ["empirical", "practical", "real", "tested"],
                  question:
                    "The researchers based their conclusions on _____ evidence gathered over ten years.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer:
                    "It is worth noting that the implications extend beyond the immediate context",
                  options: [
                    "that",
                    "noting",
                    "is",
                    "worth",
                    "It",
                    "extend",
                    "the",
                    "context",
                    "beyond",
                    "immediate",
                    "implications",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "The research suggests that",
                  options: Prisma.JsonNull,
                  question:
                    "Write an academic paragraph summarizing the causes of climate change.",
                },
              ],
            },
          },
          {
            title: "Ironia e Nuances Culturais",
            order: 3,
            description:
              "Entenda o humor britânico, ironia e subtexto cultural.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "Sarcasm",
                  options: ["Sarcasm", "Metaphor", "Simile", "Hyperbole"],
                  question:
                    "'Oh great, another Monday!' — what literary device is this?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer: "He has a way with words if you know what I mean",
                  options: Prisma.JsonNull,
                  question:
                    "Traduza: 'Ele tem um jeito com as palavras, se você me entende'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "tongue",
                  options: ["tongue", "cheek", "lip", "mouth"],
                  question: "The comment was made with _____ firmly in cheek.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer:
                    "British humor often relies on understatement and irony",
                  options: [
                    "and",
                    "British",
                    "irony",
                    "understatement",
                    "often",
                    "humor",
                    "on",
                    "relies",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "An example of cultural nuance in English is",
                  options: Prisma.JsonNull,
                  question:
                    "Describe a cultural nuance in English that non-native speakers often misunderstand.",
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.module.create({
    data: {
      language: "en",
      level: Level.ADVANCED,
      order: 2,
      title: "Escrita Avançada",
      description: "Domine a escrita criativa, formal e persuasiva em inglês.",
      lessons: {
        create: [
          {
            title: "Emails Profissionais",
            order: 1,
            description: "Como escrever emails formais e persuasivos.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "I am writing to express my concern regarding",
                  options: [
                    "I am writing to express my concern regarding",
                    "I want to talk about",
                    "This email is about",
                    "Hey, I have a problem with",
                  ],
                  question:
                    "What is the most professional opening for a complaint email?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer:
                    "I would be grateful if you could look into this matter at your earliest convenience",
                  options: Prisma.JsonNull,
                  question:
                    "Traduza: 'Ficaria grato se pudesse analisar este assunto o mais breve possível'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "sincerely",
                  options: ["sincerely", "friendly", "warmly", "best"],
                  question:
                    "Yours _____, [signature] — this is a formal email closing.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer:
                    "Please do not hesitate to contact me should you require further information",
                  options: [
                    "you",
                    "me",
                    "Please",
                    "contact",
                    "to",
                    "information",
                    "hesitate",
                    "further",
                    "do",
                    "not",
                    "require",
                    "should",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "Dear Sir or Madam",
                  options: Prisma.JsonNull,
                  question:
                    "Write a formal email requesting a meeting with a potential business partner.",
                },
              ],
            },
          },
          {
            title: "Escrita Criativa",
            order: 2,
            description: "Técnicas para escrita criativa e narrativa.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "Show, don't tell",
                  options: [
                    "Show, don't tell",
                    "Write long sentences",
                    "Use many adjectives",
                    "Explain everything",
                  ],
                  question:
                    "What is the fundamental principle of creative writing?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer:
                    "The sun dipped below the horizon painting the sky in shades of amber and crimson",
                  options: Prisma.JsonNull,
                  question:
                    "Traduza: 'O sol mergulhou abaixo do horizonte, pintando o céu em tons de âmbar e carmesim'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "foreshadowing",
                  options: [
                    "foreshadowing",
                    "metaphor",
                    "simile",
                    "alliteration",
                  ],
                  question:
                    "Hinting at future events in a story is called _____.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer:
                    "The protagonist struggled to reconcile her past with the uncertain future ahead",
                  options: [
                    "The",
                    "reconcile",
                    "her",
                    "protagonist",
                    "struggled",
                    "future",
                    "past",
                    "with",
                    "ahead",
                    "the",
                    "uncertain",
                    "to",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "It was a dark and stormy night when",
                  options: Prisma.JsonNull,
                  question:
                    "Write the opening paragraph of a short story using vivid imagery and sensory details.",
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.module.create({
    data: {
      language: "en",
      level: Level.FLUENT,
      order: 1,
      title: "Domínio Total",
      description:
        "Refine seu inglês ao nível nativo com idioms e expressões avançadas.",
      lessons: {
        create: [
          {
            title: "Expressões Idiomáticas",
            order: 1,
            description: "Domine os idioms mais usados por falantes nativos.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "very busy",
                  options: [
                    "very busy",
                    "feeling sick",
                    "working hard",
                    "stressed out",
                  ],
                  question: "What does 'I have a lot on my plate' mean?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer:
                    "Stop beating around the bush and tell me what happened",
                  options: Prisma.JsonNull,
                  question:
                    "Traduza: 'Para de enrolar e me diga o que aconteceu'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "nail",
                  options: ["nail", "hit", "catch", "touch"],
                  question:
                    "You really hit the _____ on the head with that observation.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer: "Once in a blue moon she actually arrives on time",
                  options: [
                    "time",
                    "Once",
                    "a",
                    "she",
                    "moon",
                    "on",
                    "actually",
                    "blue",
                    "in",
                    "arrives",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "As they say in English",
                  options: Prisma.JsonNull,
                  question:
                    "Use 5 different idioms in a short paragraph about a challenging day at work.",
                },
              ],
            },
          },
          {
            title: "Phrasal Verbs Avançados",
            order: 2,
            description: "Domínio total de phrasal verbs complexos.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer: "to tolerate or endure",
                  options: [
                    "to tolerate or endure",
                    "to put something away",
                    "to stand somewhere",
                    "to bear something",
                  ],
                  question: "What does 'put up with' mean?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer:
                    "I cannot put up with his constant complaining anymore",
                  options: Prisma.JsonNull,
                  question:
                    "Traduza: 'Não aguento mais as reclamações constantes dele'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "up",
                  options: ["up", "out", "in", "down"],
                  question:
                    "She managed to pull _____ a miraculous recovery after the surgery.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer:
                    "The deal fell through at the last minute despite months of negotiation",
                  options: [
                    "negotiation",
                    "The",
                    "fell",
                    "months",
                    "through",
                    "last",
                    "of",
                    "deal",
                    "the",
                    "despite",
                    "minute",
                    "at",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "In the meeting they brought up",
                  options: Prisma.JsonNull,
                  question:
                    "Write a short dialogue using at least 6 different phrasal verbs naturally.",
                },
              ],
            },
          },
          {
            title: "Registro e Estilo",
            order: 3,
            description:
              "Adapte seu inglês a diferentes contextos e registros.",
            exercises: {
              create: [
                {
                  type: ExerciseType.MULTIPLE_CHOICE,
                  order: 1,
                  answer:
                    "The proposed legislation is unlikely to garner sufficient bipartisan support",
                  options: [
                    "The proposed legislation is unlikely to garner sufficient bipartisan support",
                    "The law probably won't get enough votes",
                    "Politicians don't agree on the law",
                    "The bill needs more support",
                  ],
                  question:
                    "Which sentence is most appropriate for a formal news article?",
                },
                {
                  type: ExerciseType.TRANSLATE,
                  order: 2,
                  answer:
                    "His colloquial tone was at odds with the gravity of the situation",
                  options: Prisma.JsonNull,
                  question:
                    "Traduza: 'Seu tom coloquial estava em desacordo com a gravidade da situação'",
                },
                {
                  type: ExerciseType.FILL_IN_THE_BLANK,
                  order: 3,
                  answer: "register",
                  options: ["register", "tone", "style", "voice"],
                  question:
                    "Switching from formal to informal language means changing your _____.",
                },
                {
                  type: ExerciseType.ORDER_WORDS,
                  order: 4,
                  answer:
                    "The ability to code switch between registers is a hallmark of true fluency",
                  options: [
                    "hallmark",
                    "The",
                    "true",
                    "registers",
                    "ability",
                    "fluency",
                    "between",
                    "of",
                    "switch",
                    "code",
                    "is",
                    "a",
                    "to",
                  ],
                  question: "Ordene as palavras:",
                },
                {
                  type: ExerciseType.FREE_WRITE,
                  order: 5,
                  answer: "To illustrate the difference in register",
                  options: Prisma.JsonNull,
                  question:
                    "Rewrite this message formally: 'Hey! So basically we gotta talk about the project asap cause things are going sideways.'",
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("✅ Seed concluído!");
  console.log("   📦 11 módulos criados");
  console.log("   📖 31 lições criadas");
  console.log("   ✏️  155 exercícios criados");
  console.log(
    "   🌍 Inglês: BEGINNER · BASIC · INTERMEDIATE · ADVANCED · FLUENT",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
