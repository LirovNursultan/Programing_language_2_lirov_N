// Вычислить среднюю оценку
export function getAverageRating(ratings = []) {
  if (ratings.length === 0) return 0;
  return (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
}

// Форматировать дату
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ru-RU');
}

// Обрезать длинный текст
export function truncate(text = '', max = 100) {
  return text.length > max ? text.slice(0, max) + '...' : text;
}
