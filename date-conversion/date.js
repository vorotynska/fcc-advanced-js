// In this lab, you'll build a program to convert a date from one format to another.

// 1. Создаём переменную с текущей датой и временем
const currentDate = new Date();

// 2. Формируем строку с текущей датой и временем
const currentDateFormat = `Current Date and Time: ${currentDate}.`
console.log(currentDateFormat);

// 3. Функция для форматирования в MM/DD/YYYY
function formatDateMMDDYYYY(date) {
    const testDate = new Date(date);
    const month = testDate.getMonth() + 1
    const year = testDate.getFullYear();
    const day = testDate.getDate();
    return `Formatted Date (MM/DD/YYYY): ${month}/${day}/${year}`;
}

// 4. Функция для форматирования в длинный формат (Month Day, Year)
function formatDateLong(date) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formatted = date.toLocaleDateString('en-US', options);
    return `Formatted Date (Month Day, Year): ${formatted}`;
}

console.log(formatDateLong(currentDate));
console.log(formatDateMMDDYYYY('Fri Sep 27 2024 16:16:11 GMT+0500 (Pakistan Standard Time)'));