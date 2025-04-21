const pads = document.querySelectorAll(".drum-pad");
const display = document.getElementById("display");

function playSound(letter) {
    const audio = document.getElementById(letter);
    const pad = audio?.parentElement;
    if (audio && pad) {
        audio.currentTime = 0;
        audio.play();
        display.textContent = pad.id;

        pad.classList.add("active");
        setTimeout(() => pad.classList.remove("active"), 150);
    }
}

pads.forEach((pad) => {
    pad.addEventListener("click", () => {
        const letter = pad.textContent.trim();
        playSound(letter);
    });
});

document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    if ("QWEASDZXC".includes(key)) {
        playSound(key);
    }
});

const volumeSlider = document.getElementById("volume");
const audioElements = document.querySelectorAll(".clip");

volumeSlider.addEventListener("input", () => {
    audioElements.forEach(audio => {
        audio.volume = volumeSlider.value;
    });
});