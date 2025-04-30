// the Bookmark Manager app can store a collection of bookmarks 
// in the local storage and read data from it.
const mainSection = document.getElementById("main-section");
const formSection = document.getElementById("form-section");
const addBookmarkButton = document.getElementById("add-bookmark-button");
const categoryName = document.querySelectorAll(".category-name");
const categoryDropdown = document.getElementById("category-dropdown");
const closeFormButton = document.getElementById("close-form-button");
const addBookmarkButtonForm = document.getElementById("add-bookmark-button-form");
const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const bookmarkListSection = document.getElementById("bookmark-list-section");
const viewCategoryButton = document.getElementById("view-category-button");
const categoryList = document.getElementById("category-list");
const closeListButton = document.getElementById("close-list-button");
const deleteBookmarkButton = document.getElementById("delete-bookmark-button");

// function returns the bookmarks array stored in the local storage
function getBookmarks() {
    try {
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

        if (
            Array.isArray(bookmarks) &&
            bookmarks.every(
                b =>
                typeof b === "object" &&
                b !== null &&
                "name" in b &&
                "category" in b &&
                "url" in b
            )
        ) {
            return bookmarks;
        }
    } catch (e) {
        // если JSON.parse выдаст ошибку
    }
    return [];
}

//function toggles the hidden class on #main-section and #form-section
const displayOrCloseForm = () => {
    mainSection.classList.toggle("hidden");
    formSection.classList.toggle("hidden");
}

//function toggles the hidden class on #main-section and #bookmark-list-section
const displayOrHideCategory = () => {
    mainSection.classList.toggle("hidden");
    bookmarkListSection.classList.toggle("hidden");
}

//update the inner text of .category-name to be the value of the selected option from #category-dropdown 
addBookmarkButton.addEventListener("click", (e) => {
    categoryName.forEach(item => item.innerText = categoryDropdown.value);
    displayOrCloseForm();
})

//when click hide the form section and display the main section
closeFormButton.addEventListener("click", () => displayOrCloseForm());

//hide the #bookmark-list-section and display the main section
closeListButton.addEventListener("click", () => displayOrHideCategory())

//add bookmark 
addBookmarkButtonForm.addEventListener("click", (e) => {
    e.preventDefault();
    const category = categoryDropdown.value;
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();

    if (!name || !url) return;

    const bookmarks = getBookmarks();
    bookmarks.push({
        name,
        category,
        url
    });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    nameInput.value = "";
    urlInput.value = "";
    displayOrCloseForm();
})
//category View Handler
viewCategoryButton.addEventListener("click", () => {
    displayOrHideCategory();
    categoryName.forEach(item => item.innerText = categoryDropdown.value);

    const bookmarks = getBookmarks().filter(item => item.category === categoryDropdown.value);

    if (bookmarks.length === 0) {
        categoryList.innerHTML = `<p>No Bookmarks Found</p>`
    } else {
        categoryList.innerHTML = bookmarks.map((bookmark) => `
            <div>
                <input type="radio" id="${bookmark.name}" name="bookmark" value="${bookmark.name}">
                <label for="${bookmark.name}">
                   <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
                </label>
            </div>
        `).join('');
    }
})

deleteBookmarkButton.addEventListener("click", () => {
    const selectedRadio = document.querySelector(`input[type="radio"]:checked`);

    if (!selectedRadio) return;

    const bookmarkName = selectedRadio.value;
    console.log(bookmarkName);
    let bookmarks = getBookmarks();
    bookmarks = bookmarks.filter(item => !(item.name === bookmarkName && item.category === categoryDropdown.value));
    console.log(bookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    document.getElementById("view-category-button").click();
})