const books = [{
        title: "To Kill a Mockingbird",
        authorName: "Harper Lee",
        releaseYear: 1960
    },
    {
        title: "1984",
        authorName: "George Orwell",
        releaseYear: 1949
    },
    {
        title: "The Great Gatsby",
        authorName: "F. Scott Fitzgerald",
        releaseYear: 1925
    },
    {
        title: "The Catcher in the Rye",
        authorName: "J.D. Salinger",
        releaseYear: 1951
    },
    {
        title: "Harry Potter and the Sorcerer's Stone",
        authorName: "J.K. Rowling",
        releaseYear: 1997
    }
];

function sortByYear(book1, book2) {
    if (book1.releaseYear < book2.releaseYear) return -1;
    if (book1.releaseYear > book2.releaseYear) return 1;
    return 0;
}

const filteredBooks = books.filter(book => book.releaseYear > 1950);

filteredBooks.sort(sortByYear);
console.log(filteredBooks);