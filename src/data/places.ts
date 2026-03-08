import paint_p from '/images/puzzles/paint.png';
import day1Img from '/images/places/day1.png';
import tokyo from '/images/places/tokyo.png';
import paint from '/images/places/paint.png';
import love from '/images/places/love.png';
import branch from '/images/places/branch.png';
import ice from '/images/places/ice.png';
import quest from '/images/places/quest.png';
import tree from '/images/places/tree.png';
export type ActivityType =
  | 'quiz'
  | 'puzzle'
  | 'morse'
  | 'confession'
  | 'hearts'
  | 'catch-hearts'
  | 'it-english';

export interface QuizOption {
  id: string;
  text: string;
  correct?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  successText: string;
}

export interface QuizActivity {
  type: 'quiz';
  questions: QuizQuestion[];
}

export interface PuzzleActivity {
  type: 'puzzle';
  textBefore: string;
  textAfter: string;
  imageUrl?: string;
}

export interface MorseActivity {
  type: 'morse';
  encoded: string;
  placeholder: string;
  answer: string;
  successText: string;
}

export interface ConfessionActivity {
  type: 'confession';
  textBefore: string;
  revealedText: string;
  buttonBefore: string;
  buttonAfter: string;
}

export interface HeartsActivity {
  type: 'hearts';
  textBefore: string;
  textAfter: string;
  total: number;
}

export interface CatchHeartsActivity {
  type: 'catch-hearts';
  textBefore: string;
  targetScore: number;
  successText: string;
}

export interface ITEnglishPair {
  id: string;
  term: string;
  definition: string;
}

export interface ITEnglishMatchActivity {
  type: 'it-english';
  textBefore: string;
  pairs: ITEnglishPair[];
  targetScore: number;
  successText: string;
}

export type Activity =
  | QuizActivity
  | PuzzleActivity
  | MorseActivity
  | ConfessionActivity
  | HeartsActivity
  | CatchHeartsActivity
  | ITEnglishMatchActivity;

export interface Place {
  id: number;
  name: string;
  subtitle: string;
  coordinates: [number, number];
  image: string;
  memoryText: string;
  activity: Activity;
}

export const places: Place[] = [
  {
    id: 1,
    name: 'Day one',
    subtitle: 'Именно в этой кофейне всё и началось',
    coordinates: [55.6732, 37.5032],
    image: day1Img,
    memoryText:
      'Мы сидели в случайной кофейне, пили кофе, и я был очаровван тобой уже с первой секунды. Я внимательно слушал тебя, поражаясь, какой глубокий и красивый человек сидит напротив. Тогда я даже представить не мог, насколько чудесно всё сложится. Но уже тогда я отчётливо чувствовал рядом с тобой комфорт и спокойствие',
    activity: {
      type: 'it-english',
      textBefore:
        'В тот день зародился тот самый дуэт English girl и IT boy Давай проверим, как мы дополняем друг друга.',
      targetScore: 60,
      successText: ' IT + EN = ❤️ ',
      pairs: [
        {
          id: 'frontend',
          term: 'Frontend',
          definition: 'то, что видит пользователь',
        },
        {
          id: 'backend',
          term: 'Backend',
          definition: 'серверная часть',
        },
        {
          id: 'debugging',
          term: 'Debugging',
          definition: 'исправление ошибок',
        },
        {
          id: 'commit',
          term: 'Commit',
          definition: 'сохранить, зафиксировать изменения',
        },
        {
          id: 'review',
          term: 'Review',
          definition: 'Проверка кода',
        },
        {
          id: 'deploy',
          term: 'Deploy',
          definition: 'выложить на сервер',
        },
      ],
    },
  },
  {
  id: 2,
  name: 'Tokиo',
  subtitle: 'Место с самой вкусной Клубничной Маргаритой 🍸',
  coordinates: [55.6650, 37.4813],
  image: tokyo,
  memoryText:
    'Этот ресторан, бесспорно, занимает особое местечко в сердце у всех, кто учится на Южке. Оно всегда нас притягивало. Отличные блюда, приятные коктейли и невероятные шотики, ради которых хочется приходить сюда снова и снова. Интересный факт: ровно 5 раз мы были с тобой в Tokиo City',
  activity: {
    type: 'quiz',
    questions: [
      {
        id: 'q1',
        question: 'Какого коктейля нет в меню Tokиo City?',
        options: [
          { id: 'a', text: 'Еживичный Спритц'},
          { id: 'b', text: 'Вишнёвый поцелуй ', correct: true },
          { id: 'c', text: 'А я думала сова...' },
        ],
        successText: 'В их коктейли можно влюбиться с первого глотка 🍓',
      },
      {
        id: 'q2',
        question: 'Какая была особенность у нашего первого похода в Tokиo City?',
        options: [
          { id: 'a', text: 'Кушали и пили много вкусного' },
          { id: 'b', text: 'Получили бесплатную пиццу'},
          { id: 'c', text: 'Это было в Одинцово', correct: true },
        ],
        successText: 'Верно! Тот самый вечер после просмотра фильма "Мастер и Маргарита" (Опять Маргарита!)',
      },
      {
        id: 'q3',
        question: 'Вернёмся на Южку и поговорим о расстоянии. 1600 метров - это расстояние между ... ',
        options: [
          { id: 'a', text: 'МПГУ и Avenue' },
          { id: 'b', text: 'МПГУ и главным корпусом МИРЭА', correct: true },
          { id: 'c', text: 'МПГУ и остановкой' },
        ],
        successText: 'Хоть и 1600 метров между нами, но души наши очень близки!',
      },
    ],
  },
},
 
  {
  id: 3,
  name: 'Вечер адреналина',
  subtitle: 'Где ты была самой смелой',
  coordinates: [55.7962, 37.7517],
  image: quest,
  memoryText:
    'Крайняя наша встреча перед твоим отъездом... Мы тогда носились по комнатам (хорошее получилось кардио), разгадывали загадки, искали подсказки, получали адреналин и никак не могли определиться кому помогать: призраку школьницы или директрисе? Но самое крутое, что было в тот вечер - это твой героический забег. Ты проявила себя невероятно смело, я смотрел на тебя с таким восхищением и гордость!',
  activity: {
    type: 'morse',
    encoded: '... - .-. .- -. --. . .-.  - .... .. -. --. ...',
    placeholder: 'Два слова',
    answer: 'STRANGER THINGS',
    successText: 'Stranger Things - очень странные дела. Как то, что наши пути не пересеклись с тобой раньше ✨',
},
},
{
  id: 4,
  name: 'Лёд, друзья и мы',
  subtitle: 'Зимняя сказка на ВДНХ',
  coordinates: [55.8286, 37.6337],
  image: ice,
  memoryText:
    'Этой зимой мы собрались большой компанией и пошли на каток ВДНХ. Огни, музыка, русская прохладная зима, невероятный запах глинтвейна, тёплый костёр. А я всё не мог нарадоваться, что ты наконец вернулась из Казахстана. В тот вечер я вновь вспомнил, как мне с тобой хорошо...',
  activity: {
    type: 'quiz',
    questions: [
      {
        id: 'q1',
        question: 'А помнишь, на какой каток мы ходили вдвоём ещё в 2024?',
        options: [
          { id: 'a', text: 'Парк Горького' },
          { id: 'b', text: 'Сокольники'},
          { id: 'c', text: 'Лужники', correct: true  },
        ],
        successText:
          'Тогда в Лужниках мы, крепко держась друг за друга, покатались, не заметив, как пролетело несколько часов ❄️⛸️',
      },
    ],
  },
},
  {
    id: 5,
    name: 'Кино перед Новым годом',
    subtitle: 'Ёлки 11 и наши традиции',
    coordinates: [55.6782, 37.4665],
    image: tree,
    memoryText:
  'В этих фильмах есть какое-то особенное новогоднее волшебство. И я очень хочу, чтобы просмотр «Ёлок» действительно стал нашей уютной ежегодной традицией. Ты и я, зал, предвкушение праздника и новогоднее настроение на все 100%! Пусть так будет всегда 🎄🎉',
    activity: {
      type: 'confession',
      textBefore:
        'У нас уже есть одна добрая традиция, которая живёт в каждом моём подарке. Знаешь, о чём я? 👀',
      revealedText: 'Верно, мой плюшевый мишка с розовым сердечком!',
      buttonBefore: 'Проявить невидимое послание',
      buttonAfter: '✨',
    },
  },
  {
    id: 6,
    name: 'Бранч-тайм',
    subtitle: 'Завтраки с тобой всегда самые вкусные и тёплые',
    coordinates: [55.6623, 37.4191],
    image: branch,
    memoryText:
     'Приглянулись нам кафешки в этом жилом комплексе. Столько раз тут отлично проводили время. Вкусно и эстетично кушали, пили кофе и шампанское, мило беседовали, а в крайний раз даже решали головоломку 🤔 Здесь всегда было уютно, светло и как-то по-особенному тепло ... но как мне кажется это всё в первую очередь благодаря тебе 🫂',
    activity: {
      type: 'quiz',
      questions: [
        {
          id: 'q1',
          question: 'Давай вспомним, а в каком именно кафе ты ела эти сырники?',
          options: [
            { id: 'a', text: 'Здрасте' },
            { id: 'b', text: 'Коразон', correct: true  },
            { id: 'c', text: 'Лес'},
          ],
          successText: 'Жду не дождусь, чтобы устроить наш домашний бранч и накормить тебя своими сырниками!🤍',
        },
      ],
    },
  },
  {
    id: 7,
    name: 'LOVE ❤️',
    subtitle: 'Любовь ОТ и ДО',
    coordinates: [55.7309, 37.6262],
    image: love,
    memoryText:
      'Отличная и очень увлекательная выставка, на которой было много рефлексии, глубоких мыслей и интерактива. А после был чудесный вечер в Ново-Переделкине с шампанским и просмотром работ лучших студентов МПГУ',
   activity: {
      type: 'catch-hearts',
      textBefore:
        'Мы пропустили один из первормансов! Здесь до сих пор летают сердечки. Попробуешь поймать их все в одну корзинку? Лови только обычные и особенные сердечки, а разбитые лучше облетать стороной. 💗',
      targetScore: 30,
      successText:
        'Ты поймала столько сердечек, сколько я ловлю каждый день, глядя на тебя. 30 очков любви! ❤️',
    },
  },
  {
  id: 8,
  name: 'День, когда мы стали художниками 🎨',
  subtitle: 'Наш мастер-класс в Палитре Чувств',
  coordinates: [55.7743, 37.6034],
  image: paint,
  memoryText:
   'Пришли. Вдохновились. Написали картины. Пофоткались. Остались очень довольны и картинами, и тем, что снова создали что-то прекрасное вдвоём',
  activity: {
    type: 'puzzle',
    textBefore: 'Эльза пробегала мимо и случайно задела картину хвостиком... Картина рассыпалась, нужно воссоздать её снова ',
    textAfter: 'Вот оно! Настоящее произведение искусства, как и ты 😘 ',
    imageUrl: paint_p,
  },
},
];

