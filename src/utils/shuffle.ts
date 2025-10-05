import type { Question } from '../types';


export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


export function shuffleQuestions(questions: Question[]): Question[] {
  return questions.map(question => ({
    ...question,
    options: shuffleArray(question.options)
  }));
}


export function getRandomQuestionsByDifficulty(
  allQuestions: Question[], 
  difficulty: string, 
  count: number
): Question[] {
  // Фільтруємо питання за складністю
  const filteredQuestions = allQuestions.filter(q => q.difficulty === difficulty);
  
  if (filteredQuestions.length === 0) {
    return [];
  }
  
  
  const shuffled = shuffleArray(filteredQuestions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getMixedRandomQuestions(
  allQuestions: Question[], 
  count: number
): Question[] {
  const shuffled = shuffleArray(allQuestions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}