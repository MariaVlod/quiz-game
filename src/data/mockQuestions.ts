import type { Question } from '../types';

export const mockQuestions: Question[] = [
  // Easy questions (1-15)
  {
    id: '1',
    text: 'Який актор зіграв головну роль у фільмі "Матриця"?',
    options: [
      { id: 'a', text: 'Кіану Рівз' },
      { id: 'b', text: 'Вілл Сміт' },
      { id: 'c', text: 'Том Круз' },
      { id: 'd', text: 'Бред Пітт' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: '2',
    text: 'Яка акторка зіграла Герміону Грейнджер у фільмах про Гаррі Поттера?',
    options: [
      { id: 'a', text: 'Емма Вотсон' },
      { id: 'b', text: 'Емма Стоун' },
      { id: 'c', text: 'Емілія Кларк' },
      { id: 'd', text: 'Дженніфер Лоуренс' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: '3',
    text: 'У якому фільмі діє персонаж Тоні Старк?',
    options: [
      { id: 'a', text: 'Залізна людина' },
      { id: 'b', text: 'Тор' },
      { id: 'c', text: 'Капітан Америка' },
      { id: 'd', text: 'Доктор Стрендж' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: '4',
    text: 'Який фільм розповідає про пригоди льодовикового періоду?',
    options: [
      { id: 'a', text: 'Льодовиковий період' },
      { id: 'b', text: 'Мадагаскар' },
      { id: 'c', text: 'Король Лев' },
      { id: 'd', text: 'В пошуках Немо' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: '5',
    text: 'Хто зіграв Джек Доусон у фільмі "Титанік"?',
    options: [
      { id: 'a', text: 'Леонардо ДіКапріо' },
      { id: 'b', text: 'Бред Пітт' },
      { id: 'c', text: 'Джонні Депп' },
      { id: 'd', text: 'Метт Деймон' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: '6',
    text: 'Який фільм Діснея розповідає про принцесу, яка втратила пам\'ять?',
    options: [
      { id: 'a', text: 'Попелюшка' },
      { id: 'b', text: 'Русалонька' },
      { id: 'c', text: 'Красуня і чудовисько' },
      { id: 'd', text: 'Заплутана історія' }
    ],
    correctOptionId: 'd',
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: '7',
    text: 'Хто режисер серії фільмів "Месники"?',
    options: [
      { id: 'a', text: 'Джосс Відон' },
      { id: 'b', text: 'Брати Руссо' },
      { id: 'c', text: 'Джеймс Кемерон' },
      { id: 'd', text: 'Крістофер Нолан' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: '8',
    text: 'Який персонаж сказав: "Я буду знову"?',
    options: [
      { id: 'a', text: 'Термінатор' },
      { id: 'b', text: 'Рембо' },
      { id: 'c', text: 'Дарт Вейдер' },
      { id: 'd', text: 'Джек Сперау' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: '9',
    text: 'У якому фільмі діє школа чарівників Хогвартс?',
    options: [
      { id: 'a', text: 'Володар перснів' },
      { id: 'b', text: 'Хроніки Нарнії' },
      { id: 'c', text: 'Гаррі Поттер' },
      { id: 'd', text: 'Персі Джексон' }
    ],
    correctOptionId: 'c',
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: '10',
    text: 'Який актор зіграв Джокера у фільмі "Темний лицар"?',
    options: [
      { id: 'a', text: 'Джек Ніколсон' },
      { id: 'b', text: 'Хіт Леджер' },
      { id: 'c', text: 'Хоакін Фенікс' },
      { id: 'd', text: 'Джаред Лето' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: '11',
    text: 'Яка компанія випустила фільм "Король Лев"?',
    options: [
      { id: 'a', text: 'Pixar' },
      { id: 'b', text: 'DreamWorks' },
      { id: 'c', text: 'Disney' },
      { id: 'd', text: 'Warner Bros' }
    ],
    correctOptionId: 'c',
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: '12',
    text: 'У якому фільмі головний герой використовує зброю під назвою "світловий меч"?',
    options: [
      { id: 'a', text: 'Зоряні війни' },
      { id: 'b', text: 'Зоряний шлях' },
      { id: 'c', text: 'Марсіанин' },
      { id: 'd', text: 'Голодні ігри' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: '13',
    text: 'Як звати головного героя фільму "Форсаж"?',
    options: [
      { id: 'a', text: 'Браян О\'Коннер' },
      { id: 'b', text: 'Домінік Торетто' },
      { id: 'c', text: 'Люк Гоббс' },
      { id: 'd', text: 'Роман Пірс' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: '14',
    text: 'Хто зіграв Нео у фільмі "Матриця"?',
    options: [
      { id: 'a', text: 'Кіану Рівз' },
      { id: 'b', text: 'Лоренс Фішберн' },
      { id: 'c', text: 'Гюго Вівінг' }, 
      { id: 'd', text: 'Керрі-Енн Мосс' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'easy'
  },
  {
    id: '15',
    text: 'Який фільм виграв Оскар за найкращий фільм у 2020 році?',
    options: [
      { id: 'a', text: '1917' },
      { id: 'b', text: 'Паразити' },
      { id: 'c', text: 'Джокер' },
      { id: 'd', text: 'Одного разу в Голлівуді' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'easy'
  },

  // Medium questions (16-30)
  {
    id: '16',
    text: 'У якому році вийшов фільм "Титанік"?',
    options: [
      { id: 'a', text: '1995' },
      { id: 'b', text: '1997' },
      { id: 'c', text: '1999' },
      { id: 'd', text: '2001' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: '17',
    text: 'Хто режисер фільму "Кримінальне чтиво"?',
    options: [
      { id: 'a', text: 'Мартін Скорсезе' },
      { id: 'b', text: 'Квентін Тарантіно' },
      { id: 'c', text: 'Стівен Спілберг' },
      { id: 'd', text: 'Крістофер Нолан' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: '18',
    text: 'Який актор зіграв Росомаху у серії фільмів "Люди Ікс"?',
    options: [
      { id: 'a', text: 'Хью Джекман' },
      { id: 'b', text: 'Райан Рейнольдс' },
      { id: 'c', text: 'Патрік Стюарт' },
      { id: 'd', text: 'Ієн Маккеллен' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: '19',
    text: 'У якому фільмі вперше з\'явився персонаж Джокер?',
    options: [
      { id: 'a', text: 'Бетмен (1989)' },
      { id: 'b', text: 'Темний лицар' },
      { id: 'c', text: 'Бетмен: Початок' },
      { id: 'd', text: 'Джокер' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: '20',
    text: 'Хто зіграв Вінса Ніла у фільмі "The Dirt"?',
    options: [
      { id: 'a', text: 'Майкл Корс' },
      { id: 'b', text: 'Дуглас Бут' },
      { id: 'c', text: 'Деніел Вебстер' },
      { id: 'd', text: 'Тревіс Баркер' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: '21',
    text: 'Який фільм отримав найбільшу кількість Оскарів в історії?',
    options: [
      { id: 'a', text: 'Титанік' },
      { id: 'b', text: 'Бен-Гур' },
      { id: 'c', text: 'Володар перснів: Повернення короля' },
      { id: 'd', text: 'Все про Єву' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: '22',
    text: 'Хто режисер фільму "Назад у майбутнє"?',
    options: [
      { id: 'a', text: 'Стівен Спілберг' },
      { id: 'b', text: 'Роберт Земекіс' },
      { id: 'c', text: 'Джордж Лукас' },
      { id: 'd', text: 'Джеймс Кемерон' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: '23',
    text: 'У якому році вийшов перший фільм про Гаррі Поттера?',
    options: [
      { id: 'a', text: '1999' },
      { id: 'b', text: '2001' },
      { id: 'c', text: '2003' },
      { id: 'd', text: '2005' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: '24',
    text: 'Який актор зіграв молодого Вілла Тернера у фільмі "Пірати Карибського моря"?',
    options: [
      { id: 'a', text: 'Орландо Блум' },
      { id: 'b', text: 'Джонні Депп' },
      { id: 'c', text: 'Джек Девенпорт' },
      { id: 'd', text: 'Кевін МакНеллі' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: '25',
    text: 'Хто написав музику до фільму "Зоряні війни"?',
    options: [
      { id: 'a', text: 'Джон Вільямс' },
      { id: 'b', text: 'Ганс Циммер' },
      { id: 'c', text: 'Енніо Морріконе' },
      { id: 'd', text: 'Денні Ельфман' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: '26',
    text: 'Який фільм був першим у кінематографічному всесвіті Marvel?',
    options: [
      { id: 'a', text: 'Залізна людина' },
      { id: 'b', text: 'Неймовірний Халк' },
      { id: 'c', text: 'Тор' },
      { id: 'd', text: 'Капітан Америка' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: '27',
    text: 'Хто зіграв головну роль у фільмі "Людина-павук: Додому шляху нема" (2021)?',
    options: [
      { id: 'a', text: 'Тобі Магуайр' },
      { id: 'b', text: 'Ендрю Гарфілд' },
      { id: 'c', text: 'Том Голланд' },
      { id: 'd', text: 'Джейк Джилленгол' }
    ],
    correctOptionId: 'c',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: '28',
    text: 'Який фільм Квентіна Тарантіно виграв Оскар за найкращий оригінальний сценарій?',
    options: [
      { id: 'a', text: 'Кримінальне чтиво' },
      { id: 'b', text: 'Джанго вільний' },
      { id: 'c', text: 'Одного разу в Голлівуді' },
      { id: 'd', text: 'Безславні виродки' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: '29',
    text: 'У якому фільмі звучить фраза "Я король світу!"?',
    options: [
      { id: 'a', text: 'Титанік' },
      { id: 'b', text: 'Аватар' },
      { id: 'c', text: 'Володар перснів' },
      { id: 'd', text: 'Гладіатор' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: '30',
    text: 'Хто режисер фільму "Початок" (Inception)?',
    options: [
      { id: 'a', text: 'Стівен Спілберг' },
      { id: 'b', text: 'Крістофер Нолан' },
      { id: 'c', text: 'Денні Бойл' },
      { id: 'd', text: 'Девід Фінчер' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'medium'
  },

  // Hard questions (31-45)
  {
    id: '31',
    text: 'Скільки Оскарів отримав фільм "The Lord of the Rings: The Return of the King"?',
    options: [
      { id: 'a', text: '8' },
      { id: 'b', text: '11' },
      { id: 'c', text: '13' },
      { id: 'd', text: '15' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: '32',
    text: 'Який фільм був першим кольоровим фільмом Діснея?',
    options: [
      { id: 'a', text: 'Білосніжка і сім гномів' },
      { id: 'b', text: 'Попелюшка' },
      { id: 'c', text: 'Фантазія' },
      { id: 'd', text: 'Книга джунглів' }
    ],
    correctOptionId: 'c',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: '33',
    text: 'Хто був наймолодшим актором, який отримав Оскар за найкращу чоловічу роль?',
    options: [
      { id: 'a', text: 'Леонардо ДіКапріо' },
      { id: 'b', text: 'Едріен Броуді' },
      { id: 'c', text: 'Тімоті Шаламе' },
      { id: 'd', text: 'Річард Дрейфус' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: '34',
    text: 'Який фільм триває найдовше в історії кінематографу?',
    options: [
      { id: 'a', text: 'Ірландець' },
      { id: 'b', text: 'Володар перснів: Повернення короля' },
      { id: 'c', text: 'Лоуренс Аравійський' },
      { id: 'd', text: 'Сага' }
    ],
    correctOptionId: 'd',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: '35',
    text: 'Хто є єдиним режисером, який отримав три Оскари поспіль?',
    options: [
      { id: 'a', text: 'Френк Коппола' },
      { id: 'b', text: 'Джон Форд' },
      { id: 'c', text: 'Стівен Спілберг' },
      { id: 'd', text: 'Мартін Скорсезе' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: '36',
    text: 'Який фільм вважається першим повнометражним анімаційним фільмом?',
    options: [
      { id: 'a', text: 'Білосніжка і сім гномів' },
      { id: 'b', text: 'Пригоди принца Ахмеда' },
      { id: 'c', text: 'Стімпі' },
      { id: 'd', text: 'Фантазмагорія' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: '37',
    text: 'Хто з акторок отримала найбільше номінацій на Оскар?',
    options: [
      { id: 'a', text: 'Меріл Стріп' },
      { id: 'b', text: 'Кетрін Гепберн' },
      { id: 'c', text: 'Бетт Девіс' },
      { id: 'd', text: 'Джуді Денч' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: '38',
    text: 'Який фільм має найкасовіший вікенд прем\'єри в історії?',
    options: [
      { id: 'a', text: 'Месники: Фінал' },
      { id: 'b', text: 'Людина-павук: Нема шляху додому' },
      { id: 'c', text: 'Месники: Війна нескінченності' },
      { id: 'd', text: 'Зоряні війни: Пробудження Сили' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: '39',
    text: 'Хто був першим афроамериканським актором, який отримав Оскар за найкращу чоловічу роль?',
    options: [
      { id: 'a', text: 'Сідні Пуатьє' },
      { id: 'b', text: 'Дензел Вашингтон' },
      { id: 'c', text: 'Морган Фрімен' },
      { id: 'd', text: 'Вілл Сміт' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: '40',
    text: 'Яка кіностудія випустила фільм "Психо" (1960)?',
    options: [
      { id: 'a', text: 'Warner Bros' },
      { id: 'b', text: 'Paramount' },
      { id: 'c', text: 'Universal' },
      { id: 'd', text: '20th Century Fox' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: '41',
    text: 'Хто режисер фільму "Сім самураїв"?',
    options: [
      { id: 'a', text: 'Ясудзіро Одзу' },
      { id: 'b', text: 'Акіра Куросава' },
      { id: 'c', text: 'Хаяо Міядзакі' },
      { id: 'd', text: 'Девід Фінчер' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: '42',
    text: 'Який фільм отримав Оскар за найкращий фільм у 1972 році?',
    options: [
      { id: 'a', text: 'Хрещений батько' },
      { id: 'b', text: 'Кабаре' },
      { id: 'c', text: 'Пролітаючи над гніздом зозулі' },
      { id: 'd', text: 'Апокаліпсис сьогодні' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: '43',
    text: 'Хто зіграв головну роль у оригінальному фільмі "Блейд Runner"?',
    options: [
      { id: 'a', text: 'Гаррісон Форд' },
      { id: 'b', text: 'Шон Коннері' },
      { id: 'c', text: 'Рутгер Хауер' },
      { id: 'd', text: 'Дуейн Джонсон' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: '44',
    text: 'Який фільм вважається першим звуковим фільмом у історії?',
    options: [
      { id: 'a', text: 'Співак джазу' },
      { id: 'b', text: 'Світло' },
      { id: 'c', text: 'Великий диктатор' },
      { id: 'd', text: 'Громадянин Кейн' }
    ],
    correctOptionId: 'a',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: '45',
    text: 'Хто був першим режисером, чий фільм заробив понад 1 мільярд доларів?',
    options: [
      { id: 'a', text: 'Джеймс Кемерон' },
      { id: 'b', text: 'Стівен Спілберг' },
      { id: 'c', text: 'Джордж Лукас' },
      { id: 'd', text: 'Пітер Джексон' }
    ],
    correctOptionId: 'b',
    category: 'movies',
    difficulty: 'hard'
  }
];