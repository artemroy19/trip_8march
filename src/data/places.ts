export type ActivityType = 'quiz' | 'puzzle' | 'morse' | 'confession' | 'hearts';
import { getImagePath } from '../utils/imagePath';
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

export type Activity =
  | QuizActivity
  | PuzzleActivity
  | MorseActivity
  | ConfessionActivity
  | HeartsActivity;

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
    image: getImagePath('/images/places/day1.png'),
    memoryText:
      'Я до сих пор помню, как мы стояли посреди почти пустой площади, а вокруг медленно зажигался день. Ты смеялась, потому что я никак не мог решить, с какой стороны мы смотримся красивее на фото.',
    activity: {
      type: 'quiz',
      questions: [
        {
          id: 'q1',
          question: 'Помнишь, какой дурацкий розыгрыш мы устроили с голубями?',
          options: [
            { id: 'a', text: 'Кормили их шоколадом' },
            { id: 'b', text: 'Сделали вид, что фоткаемся, а сами сбежали', correct: true },
            { id: 'c', text: 'Я пытался научить их танцевать' },
          ],
          successText:
            'Точно! Мы хотели сделать серьёзное фото, а в итоге полчаса хохотали. Спасибо тебе за эту дурашливость 🥰',
        },
        {
          id: 'q2',
          question:
            'А ещё помнишь, с какой стороны площади мы в итоге всё‑таки сделали нашу «главную» фотографию?',
          options: [
            { id: 'a', text: 'На фоне Спасской башни', correct: true },
            { id: 'b', text: 'Возле ГУМа' },
            { id: 'c', text: 'Прямо посередине мостовой' },
          ],
          successText:
            'Да, на фоне Спасской башни. И мне кажется, что на том кадре вся наша Москва поместилась в твою улыбку.',
        },
      ],
    },
  },
  {
    id: 2,
    name: 'ГУМ',
    subtitle: 'Тёплая шапка и ещё теплее объятия',
    coordinates: [55.7541, 37.6216],
    image: '/images/places/gum-hat.jpg',
    memoryText:
      'Ты замёрзла, но стеснялась признаться. А я всё видел по твоим ладошкам и носу. И эта розовая шапка до сих пор для меня как маленький символ твоего доверия.',
    activity: {
      type: 'quiz',
      questions: [
        {
          id: 'q1',
          question: 'Какого цвета была шапка, которую я купил тебе у ГУМа?',
          options: [
            { id: 'pink', text: 'Розовая', correct: true },
            { id: 'blue', text: 'Синяя' },
            { id: 'white', text: 'Белая' },
          ],
          successText:
            'Ты помнишь! А я помню, как завязывал тебе уши, чтобы не дуло. Мелочь, а греет до сих пор.',
        },
      ],
    },
  },
  {
    id: 3,
    name: 'Воробьёвы горы',
    subtitle: 'Город под ногами и наши планы',
    coordinates: [55.7105, 37.5542],
    image: '/images/places/vorobievy.jpg',
    memoryText:
      'Мы смотрели на огни Москвы и строили планы, которые казались такими далекими. А сейчас я понимаю, что многие из них уже сбываются — просто потому что мы идём рядом, даже через тысячи километров.',
    activity: {
      type: 'hearts',
      textBefore:
        'Кажется, ветер раскидал все сердечки, которыми мы украшали этот вид. Соберём их обратно? 💗',
      textAfter:
        'Вот так намного лучше. Когда все сердечки на месте, так похоже на то, как мне спокойно, когда ты рядом.',
      total: 5,
    },
  },
  {
    id: 4,
    name: 'Патриаршие пруды',
    subtitle: 'Наши бесконечные разговоры',
    coordinates: [55.7652, 37.5966],
    image: '/images/places/patriarshie.jpg',
    memoryText:
      'Мы кружили вокруг пруда и всё никак не могли наговориться. Время будто растягивалось, чтобы подарить нам ещё чуть-чуть тишины и тепла.',
    activity: {
      type: 'morse',
      encoded: '.-.. --- ...- .  ..-',
      placeholder: 'Что здесь написано?',
      answer: 'L',
      successText: 'Верно. Всегда верно. ❤️',
    },
  },
  {
    id: 5,
    name: 'Нескучный сад',
    subtitle: 'Глупые шутки и серьёзные взгляды',
    coordinates: [55.7276, 37.6034],
    image: '/images/places/neskuchny.jpg',
    memoryText:
      'Название совсем не врёт: нам с тобой там действительно никогда не было скучно. Я помню каждую твою улыбку под этими деревьями.',
    activity: {
      type: 'quiz',
      questions: [
        {
          id: 'q1',
          question: 'Что ты сказала, когда я в первый раз попытался рассказать шутку в Нескучном саду?',
          options: [
            { id: 'a', text: '«Это худшая шутка в моей жизни»' },
            { id: 'b', text: '«Я всё равно смеюсь, потому что это ты»', correct: true },
            { id: 'c', text: '«Давай лучше просто помолчим»' },
          ],
          successText:
            'Вот именно. Мне до сих пор так тепло от того, как ты умеешь смеяться надо мной и со мной одновременно.',
        },
      ],
    },
  },
  {
    id: 6,
    name: 'Парк Зарядье',
    subtitle: 'Воздушный мост и дрожащие руки',
    coordinates: [55.7520, 37.6282],
    image: '/images/places/zaryadye.jpg',
    memoryText:
      'На подвесном мосту было немного страшно, но ты просто взяла меня за руку — и стало совсем спокойно. Я тогда понял, что с тобой любые высоты не пугают.',
    activity: {
      type: 'confession',
      textBefore:
        'В этом месте я понял кое-что очень важное. Хочешь узнать, что именно пронеслось у меня в голове?',
      revealedText: 'Что хочу быть с тобой всегда. И точка.',
      buttonBefore: 'Проявить невидимое послание',
      buttonAfter: 'Всё понял(а) ✨',
    },
  },
  {
    id: 7,
    name: 'Мост Богдана Хмельницкого',
    subtitle: 'Огни, отражения и обещания',
    coordinates: [55.7413, 37.5660],
    image: '/images/places/bridge.jpg',
    memoryText:
      'Мы смотрели, как отражаются в воде огни, и я ловил себя на мысли, что ты — моя самая любимая огонёк в этой вселенной.',
    activity: {
      type: 'quiz',
      questions: [
        {
          id: 'q1',
          question: 'Что я пообещал тебе на этом мосту?',
          options: [
            { id: 'a', text: 'Каждый год сюда возвращаться' },
            { id: 'b', text: 'Никогда не будить тебя по утрам' },
            { id: 'c', text: 'Всегда быть на твоей стороне', correct: true },
          ],
          successText: 'Это обещание я повторяю про себя почти каждый день.',
        },
      ],
    },
  },
  {
    id: 8,
    name: 'ВДНХ',
    subtitle: 'Горячий чай и холодный воздух',
    coordinates: [55.8298, 37.6331],
    image: '/images/places/day1.png',
    memoryText:
      'Мы грелись чаем из бумажных стаканчиков и делали вид, что нам совсем не холодно. А на самом деле нас грело что-то совсем другое.',
    activity: {
      type: 'puzzle',
      textBefore: 'Кажется, фото из ВДНХ рассыпалось на кусочки. Поможешь собрать? 🧩',
      textAfter:
        'Смотри, какие у тебя глаза на этом фото. Я каждый раз в них немного теряюсь.',
      imageUrl: '/images/puzzles/day1.png',
    },
  },
  {
    id: 9,
    name: 'Смотровая Москва-Сити',
    subtitle: 'Город будущего и наши мечты',
    coordinates: [55.7496, 37.5363],
    image: '/images/places/city.jpg',
    memoryText:
      'Мы стояли где-то между небом и городом, и я думал, что самое правильное будущее — это то, где ты рядом.',
    activity: {
      type: 'puzzle',
      textBefore:
        'Картина города будущего чуть‑чуть перепуталась. Поменяй кусочки местами, чтобы всё снова стало на свои места 🧩',
      textAfter:
        'Вот теперь всё на своём месте. И в моей картинке будущего ты всегда в самом центре.',
      imageUrl: '/images/places/city.jpg',
    },
  },
  {
    id: 10,
    name: 'Дом',
    subtitle: 'Там, где ты',
    coordinates: [55.7522, 37.6156],
    image: '/images/places/home.jpg',
    memoryText:
      'Настоящий дом — это не стены и не адрес. Это место, где ты улыбаешься и где можно быть собой. Для меня этот дом — там, где ты.',
    activity: {
      type: 'confession',
      textBefore:
        'Это место я долго хотел назвать правильно. Кажется, наконец получилось.',
      revealedText:
        'Дом — это ты. И где бы мы ни были на карте, я всегда буду возвращаться к тебе.',
      buttonBefore: 'Открыть главное признание',
      buttonAfter: 'Сохрани это в сердце 💌',
    },
  },
];

