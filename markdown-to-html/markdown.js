const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
    let markdownText = markdownInput.value;

    // Convert h1
    markdownText = markdownText.replace(/^ *# (.*$)/gm, "<h1>$1</h1>");
    // Convert h2
    markdownText = markdownText.replace(/^ *## (.*$)/gm, "<h2>$1</h2>");
    // Convert h3
    markdownText = markdownText.replace(/^ *### (.*$)/gm, "<h3>$1</h3>");
    // Convert strong
    markdownText = markdownText.replace(/^ *\*(.*$)\}$/gm, "<strong>$1</strong>");

    // Blockquote
    markdownText = markdownText.replace(/^ *> *(.*)$/gm, "<blockquote>$1</blockquote>");

    // Image ![alt](src) ![alt-text](image-source)
    markdownText = markdownText.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">');

    // Link [text](url)
    markdownText = markdownText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Bold **text** or __text__
    markdownText = markdownText.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');

    // Italic *text* or _text_
    markdownText = markdownText.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');

    // Unordered list (- or *)
    markdownText = markdownText.replace(/^(?:-|\*) (.*)$/gm, '<li>$1</li>');
    markdownText = markdownText.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>');

    // Ordered list (1. 2. ...)
    markdownText = markdownText.replace(/^\d+\. (.*)$/gm, '<li>$1</li>');
    markdownText = markdownText.replace(/(<li>.*<\/li>)/gms, (match) => {
        return /<ul>/.markdownText(match) ? match : `<ol>${match}</ol>`;
    });

    return markdownText;
}

// Event listener to update both outputs
markdownInput.addEventListener("input", () => {
    const html = convertMarkdown();
    htmlOutput.textContent = html; // show raw HTML
    preview.innerHTML = html; // render HTML
});