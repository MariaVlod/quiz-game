import type { Question } from '../types';

export const mockQuestions: Question[] = [
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
    id: '3',
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
    id: '4',
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
    id: '5',
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
  }
];