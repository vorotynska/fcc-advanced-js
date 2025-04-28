// My project

// Инициализация переменной poll
const poll = new Map();

// Функция для добавления опций
function addOption(option) {
    if (!option.trim()) {
        return "Option cannot be empty.";
    }
    if (poll.has(option)) {
        return `Option "${option}" already exists.`;
    }
    poll.set(option, new Set());
    return `Option "${option}" added to the poll.`;
}

// Функция голосования
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

// Функция отображения результатов
function displayResults() {
    let result = "Poll Results:\n";
    poll.forEach((voters, option) => {
        result += `${option}: ${voters.size} votes\n`;
    });
    return result.trim();
}

// Добавляем начальные опции
addOption("Cats");
addOption("Dogs");
addOption("Birds");

// Выводим кнопки для голосования
const optionsDiv = document.getElementById('options');
poll.forEach((_, option) => {
    const button = document.createElement('button');
    button.innerText = option;
    button.addEventListener('click', () => handleVote(option));
    optionsDiv.appendChild(button);
});

// Обработчик голосования
function handleVote(option) {
    const voterIdInput = document.getElementById('voterId');
    const voterId = voterIdInput.value.trim();
    if (!voterId) {
        alert("Please enter your Voter ID.");
        return;
    }
    const message = vote(option, voterId);
    alert(message);
    voterIdInput.value = ""; // очищаем поле после голосования
}

// Функция для отображения прогресс-баров
function displayProgressBars() {
    const progressContainer = document.getElementById('progress-bars');
    progressContainer.innerHTML = ""; // Очистка

    let maxVotes = 0;
    poll.forEach(voters => {
        if (voters.size > maxVotes) {
            maxVotes = voters.size;
        }
    });
    if (maxVotes === 0) maxVotes = 1;

    poll.forEach((voters, option) => {
        const votes = voters.size;
        const percentage = (votes / maxVotes) * 100;

        const container = document.createElement('div');
        container.className = 'progress-container';

        const label = document.createElement('div');
        label.className = 'progress-label';
        label.innerText = `${option}: ${votes} votes`;

        const progress = document.createElement('div');
        progress.className = 'progress';

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.width = `${percentage}%`;

        // Определение цвета по проценту
        if (percentage <= 30) {
            progressBar.style.backgroundColor = '#f44336'; // Красный
        } else if (percentage <= 70) {
            progressBar.style.backgroundColor = '#ff9800'; // Оранжевый
        } else {
            progressBar.style.backgroundColor = '#4caf50'; // Зелёный
        }

        progress.appendChild(progressBar);
        container.appendChild(label);
        container.appendChild(progress);

        progressContainer.appendChild(container);
    });
}


// При клике на Show Results
document.getElementById('show-results').addEventListener('click', () => {
    document.getElementById('results').innerText = displayResults();
    displayProgressBars();
});