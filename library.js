const myLibrary = [];
const libraryDiv = document.getElementById("library");
const testBooks = [
    ["The Hobbit", "Tolkien", 295, false],
    ["Harry potter", "J.R Rowling", 432, true],
    ["Dune", "Frank Herbert", 689, true],
]

for (let i = 0; i < testBooks.length; i++) {
    addBookFromArray(testBooks[i]);
}

// Function to take book information array, make it into a book, and add to the library array
function addBookFromArray(array) {
    let newTitle = array[0];
    let newAuthor = array[1];
    let newPages = array[2];
    let newRead = array[3];
    let book = newBook(newTitle, newAuthor, newPages, newRead);
    addBookToLibrary(book);
}

console.log("active");


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

// Add book to library
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Display library on screen
myLibrary.forEach((book) => {
    let newBookDiv = document.createElement("div");
    newBookDiv.textContent = book.getInfo();
    libraryDiv.appendChild(newBookDiv);
});

