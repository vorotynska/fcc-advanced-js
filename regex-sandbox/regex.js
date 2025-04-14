const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");
const caseInsensitiveFlag = document.getElementById("i");
const clearButton = document.getElementById("clear-btn");
const globalFlag = document.getElementById("g");

function getFlags() {
    let flags = "";
    if (caseInsensitiveFlag.checked) flags += "i";
    if (globalFlag.checked) flags += "g";
    return flags;
}

function stripHighlighting(html) {
    // Удаляем все <span class="highlight"> обёртки, возвращаем чистый текст
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent;
}

function testRegex() {
    const pattern = regexPattern.value;
    const flags = getFlags();
    const rawText = stripHighlighting(stringToTest.innerHTML); // получаем текст без размеки
    try {
        const regex = new RegExp(pattern, flags);
        const matches = rawText.match(regex);

        if (matches) {
            // Highlight all matches
            const highlighted = rawText.replace(regex, match => {
                return `<span class="highlight">${match}</span>`;
            })
            stringToTest.innerHTML = highlighted;
            testResult.textContent = `Matched: ${matches.join(", ")} (Total: ${matches.length})`;
        } else {
            stringToTest.textContent = rawText; // reset to plain text
            testResult.textContent = "no match";
        }
    } catch (error) {
        testResult.textContent = "Invalid regex pattern";
        console.error(error);
    }
}

function clearAll() {
    regexPattern.value = "";
    stringToTest.innerHTML = "";
    testResult.textContent = "";
    caseInsensitiveFlag.checked = false;
    globalFlag.checked = false;
}

testButton.addEventListener("click", testRegex);
clearButton.addEventListener("click", clearAll);

//Auto-update on any input
//regexPattern.addEventListener("input", testRegex);
//stringToTest.addEventListener("input", testRegex);
//caseInsensitiveFlag.addEventListener("change", testRegex);
//globalFlag.addEventListener("change", testRegex);

// Enter start the cheks
regexPattern.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        testRegex();
    }
})