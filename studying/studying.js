// Validate Form

// prefentDefault()
const input = document.querySelector("input");
const output = document.getElementById("output");

input.addEventListener("keydown", (e) => {
    e.preventDefault();
    output.innerText = `You pressed the ${e.key} key`;
});

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // rest of code goes here
});