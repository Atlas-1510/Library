const myLibrary = [];
const libraryMain = document.getElementById("library");

// Dummy books to start with
let debug = true;
if (debug) {
    debugFn();
}
function debugFn() {
    const testBooks = [
        ["The Hobbit", "Tolkien", 295, false],
        ["Harry Potter", "J.R Rowling", 432, true],
        ["Dune", "Frank Herbert", 689, true],
        ["The Witcher", "Andrzej Sapkowski", 288, true],
    ]
    for (let i = 0; i < testBooks.length; i++) {
        addBookFromArray(testBooks[i]);
    }
}

// Function to take book information array, make it into a book, and add to the library array
function addBookFromArray(array) {
    let newTitle = array[0];
    let newAuthor = array[1];
    let newPages = array[2];
    let newRead = array[3];
    let book = newBook(newTitle, newAuthor, newPages, newRead);
    myLibrary.push(book);
}

// Book Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Book prototype behaviours - getInfo()
Book.prototype.getInfo = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read) ? "read." : "not yet read."}`
}

// Create a book
function newBook(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    return book;
}

// Display library on screen
myLibrary.forEach((book) => {
    // For each book, make a tile in the library and show the books information within that tile
    let newBookTile = document.createElement("article");
    newBookTile.classList.add("tile");
    // Book title
    let tileHeader = document.createElement("h1");
    tileHeader.textContent = book.title;
    newBookTile.appendChild(tileHeader);
    // Book information
    let tileList = document.createElement("ul");
    let tileAuthor = document.createElement("li");
    tileAuthor.textContent = book.author;
    let tilePages = document.createElement("li");
    tilePages.textContent = `${book.pages} pages`
    let tileRead = document.createElement("li");
    tileRead.textContent = (book.read) ? "Read" : "Not read";
    tileList.appendChild(tileAuthor);
    tileList.appendChild(tilePages);
    tileList.appendChild(tileRead);
    newBookTile.appendChild(tileList);
    libraryMain.appendChild(newBookTile);
});

// "Add Book" button
const addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener("onclick", () => {
    // Figure out how to make form pop up here
    // Use this video https://www.youtube.com/watch?v=MBaw_6cPmAw
})