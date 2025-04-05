const options = ["Rock", "Paper", "Scissors"];

function getRandomComputerResult() {
    const id = Math.floor(Math.random(options) * options.length);
    return options[id];
}

function hasPlayerWonTheRound(player, computer) {
    return (player === "Rock" && computer === "Scissors") ||
        (player === "Scissors" && computer === "Paper") ||
        (player === "Paper" && computer === "Rock")
}

let playerScore = 0;
let computerScore = 0;

function getRoundResults(userOption) {
    let computerResult = getRandomComputerResult();

    if (hasPlayerWonTheRound(userOption, computerResult)) {
        playerScore++;
        return `Player wins! ${userOption} beats ${computerResult}`;
    } else if (computerResult === userOption) {
        return `It's a tie! Both chose ${userOption}`;
    } else {
        computerScore++;
        return `Computer wins! ${computerResult} beats ${userOption}`;
    }
}

const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");

function showResults(userOption) {
    roundResultsMsg.innerText = getRoundResults();
    playerScoreSpanElement.innerText = playerScore;
    computerScoreSpanElement.innerText = computerScore;

    if (playerScore === 3 || computerScore === 3) {
        winnerMsgElement.innerText = `${
    playerScore === 3 ? "Player" : "Computer"
} has won the game!`;
        resetGameBtn.style.display = "block";
        optionsContainer.style.display = "none";
    }
};

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreSpanElement.innerText = playerScore;
    computerScoreSpanElement.innerText = computerScore;
    roundResultsMsg.innerText = "";
    winnerMsgElement.innerText = "";
    optionsContainer.style.display = "block";
    resetGameBtn.style.display = "none";
}

const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

rockBtn.addEventListener("click", () => showResults("Rock"));
paperBtn.addEventListener("click", () => showResults("Paper"));
scissorsBtn.addEventListener("click", () => showResults("Scissors"));

const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

resetGameBtn.addEventListener("click", resetGame);