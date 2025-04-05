document.addEventListener("DOMContentLoaded", function () {
    const textInput = document.getElementById('text-input');
    const charCount = document.getElementById("char-count");
    const maxLength = 50;

    if (textInput) {
        textInput.addEventListener("input", () => {
            let count = textInput.value.length;
            if (count > maxLength) {
                textInput.value = textInput.value.slice(0, maxLength)
                count = maxLength;
            }
            charCount.textContent = `Character Count: ${count}/${maxLength}`;

            count === maxLength ?
                charCount.style.color = "red" :
                charCount.style.color = "#333";
        });
    } else {
        console.error("select-container not found!");
    }
});