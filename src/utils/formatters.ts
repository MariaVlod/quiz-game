/**
 * Форматує час у секундах у формат "хвилини:секунди".
 * Секунди завжди відображаються з двома цифрами (з ведучим нулем).
 * 
 * @param {number} seconds - Кількість секунд для форматування
 * @returns {string} Відформатований час у форматі "хвилини:секунди"
 * 
 * @example
 * formatTime(65);   // Повертає "1:05"
 * formatTime(125);  // Повертає "2:05"
 * formatTime(3665); // Повертає "61:05"
 * formatTime(0);    // Повертає "0:00"
 * 
 * @example
 * // Використання в компоненті таймера
 * <div>Залишилось часу: {formatTime(timeLeft)}</div>
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Форматує числовий бал з роздільниками тисяч для кращої читабельності.
 * Використовує локальні налаштування браузера для форматування числа.
 * 
 * @param {number} score - Кількість балів для форматування
 * @returns {string} Відформатований рядок з балом
 * 
 * @example
 * formatScore(1000);     // Повертає "1,000" (або "1.000" в залежності від локалі)
 * formatScore(1000000);  // Повертає "1,000,000"
 * formatScore(42);       // Повертає "42"
 * 
 * @example
 * // Використання в компоненті ScoreBoard
 * <div className="score">
 *   🏆 {formatScore(score)}
 * </div>
 * 
 * @remarks
 * Функція використовує вбудований метод `toLocaleString()`, який автоматично
 * враховує регіональні налаштування користувача (кома чи крапка як роздільник).
 */
export function formatScore(score: number): string {
  return score.toLocaleString();
}