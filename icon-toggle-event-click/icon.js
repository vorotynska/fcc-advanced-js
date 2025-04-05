const favoriteIcons = document.querySelectorAll(".favorite-icon");

function favorite(element) {
    element.classList.toggle("filled");
    element.innerHTML = element.classList.contains("filled") ?
        `&#10084;` : `&#9825;`;
}

favoriteIcons.forEach(icon => {
    icon.addEventListener("click", () => favorite(icon));
});