//In this lab, you will build a set of football team cards. The user should be 
// able to use the dropdown menu and filter between the different players based 
// on their positions.


const footballTeam = {
    team: "Argentina",
    sport: "Football",
    year: 1986,
    headCoach: "Carlos Bilardo",
    players: [{
            name: "Sergio Almirón",
            position: "forward",
            isCaptain: false,
        },
        {
            name: "Sergio Batista",
            position: "midfielder",
            isCaptain: false,
        },
        {
            name: "José Luis Brown",
            position: "defender",
            isCaptain: false,
        },
        {
            name: "Daniel Passarella",
            position: "defender",
            isCaptain: false,
        },
        {
            name: "José Luis Cuciuffo",
            position: "defender",
            isCaptain: false,
        },
        {
            name: "Diego Maradona",
            position: "midfielder",
            isCaptain: true,
        },
    ]
};

const teamName = document.getElementById("team");
const worldChampionsYear = document.getElementById("year");
const coach = document.getElementById("head-coach");
const playerCards = document.getElementById("player-cards");
const playersDropdownList = document.getElementById("players");

const {
    team,
    year,
    headCoach,
    players,
} = footballTeam;

teamName.textContent = team;
worldChampionsYear.textContent = year;
coach.textContent = headCoach;

const setPlayerCards = (arr = players) => {
    return playerCards.innerHTML += arr.map(({
        name,
        position,
        isCaptain
    }) => `
    <div class="player-card">
      <h2>${isCaptain ? "(Captain)" : ""} ${name}</h2>
      <p>Position: ${position}</p>
    </div>
  `).join("");
};

playersDropdownList.addEventListener("change", (e) => {
    //e.target.value represents the value property from the playersDropdownList 
    playerCards.innerHTML = "";
    switch (e.target.value) {

        case "forward":
            setPlayerCards(players.filter(player => player.position === "forward"));
            break;
        case "midfielder":
            setPlayerCards(players.filter((player) => player.position === "midfielder"));
            break;
        case "defender":
            setPlayerCards(players.filter((player) => player.position === "defender"));
            break;
        case "goalkeeper":
            setPlayerCards(players.filter((player) => player.position === "goalkeeper"));
            break;
        default:
            setPlayerCards();
    }
});