// FreeCodeCamp project with out brauser
// 1. Инициализация переменной poll
const poll = new Map();

//2. Функция для добавления опций
const addOption = (option) => {
    if (!option.trim()) {
        return `Option cannot be empty.`;
    }
    if (poll.has(option)) {
        return `Option "${option}" already exists.`;
    }
    poll.set(option, new Set());
    return `Option "${option}" added to the poll.`;
};

// 3. Функция для голосования
function vote(option, voterId) {
    if (!poll.has(option)) {
        return `Option "${option}" does not exist.`;
    }
    const voters = poll.get(option);
    if (voters.has(voterId)) {
        return `Voter ${voterId} has already voted for "${option}".`;
    }
    voters.add(voterId);
    return `Voter ${voterId} voted for "${option}".`;
}

// 4. Функция для отображения результатов
function displayResults() {
    let result = "Poll Results:\n";
    poll.forEach((voters, option) => {
        result += `${option}: ${voters.size} votes\n`;
    });
    return result.trim();
}

// Добавляем хотя бы три опции
console.log(addOption("OptionA"));
console.log(addOption("OptionB"));
console.log(addOption("OptionC"));

// Пробуем добавить существующую опцию
console.log(addOption("OptionA"));

// Голосуем хотя бы три раза
console.log(vote("OptionA", "voter1"));
console.log(vote("OptionB", "voter2"));
console.log(vote("OptionA", "voter3"));
console.log(vote("OptionC", "voter2")); // Дополнительный пример

// Пробуем повторно проголосовать
console.log(vote("OptionA", "voter1"));

// Печатаем результаты опроса
console.log(displayResults());