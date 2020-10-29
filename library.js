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
    addBookToLibrary(book);
});

function addBookToLibrary(book) {
    // For each book, make a tile in the library and show the books information within that tile
    let newBookTile = document.createElement("article");
    newBookTile.classList.add("tile");
    // Book title
    let tileHeader = document.createElement("div");
    tileHeader.classList.add("tileHeader");
    let tileTitle = document.createElement("h1");
    tileTitle.textContent = book.title;
    tileHeader.appendChild(tileTitle);
    // Read/unread toggle
    let tileReadToggle = document.createElement("button");
    tileReadToggle.setAttribute("data-read-toggle", book.read);
    tileReadToggle.textContent = (book.read) ? "Unread?" : "Read?";
    // Delete book button
    let tileDeleteButton = document.createElement("button");
    tileDeleteButton.setAttribute("data-delete-book", "");
    tileDeleteButton.innerHTML = "&times;";
    newBookTile.appendChild(tileHeader)

    // Div to hold buttons
    let buttonHolder = document.createElement("div");
    buttonHolder.id = "buttonHolder";
    buttonHolder.appendChild(tileReadToggle);
    buttonHolder.appendChild(tileDeleteButton);
    tileHeader.appendChild(buttonHolder);



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
}




// Modals (add book button)
const overlay = document.getElementById('modalOverlay');
const modalOverlay = document.getElementById("modalOverlay");
const openModalButtons = document.querySelectorAll("[data-modal-target]");
openModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        let modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
});
const closeModalButtons = document.querySelectorAll("[data-modal-close]");
closeModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        let modal = button.closest(".modal");
        closeModal(modal)
    })
});

overlay.addEventListener("click", () => {
    closeModalButtons.forEach(button => {
        let modal = button.closest(".modal");
        closeModal(modal);
    })
});

function openModal(modal) {
    if (modal == null) console.log("No modal provided");
    modal.classList.add("active");
    overlay.classList.add("active");
};

function closeModal(modal) {
    if (modal == null) console.log("No modal provided");
    modal.classList.remove("active");
    overlay.classList.remove("active");
};

// Add book modal form functionality
const addBookSubmitButton = document.getElementById("addBookSubmit");
addBookSubmitButton.addEventListener("click", () => {
    let bookTitle = document.getElementById("bookTitle").value;
    console.log(bookTitle);
    let bookAuthor = document.getElementById("bookAuthor").value;
    console.log(bookAuthor);
    let bookPages = document.getElementById("bookPages").value;
    console.log(bookPages);
    let bookRead = (document.querySelector('input[name="read"]:checked').value == "Read") ? true : false;
    console.log(bookRead);
    let addBook = newBook(bookTitle, bookAuthor, bookPages, bookRead);
    addBookToLibrary(addBook);
    let modal = addBookSubmitButton.closest(".modal");
    closeModal(modal);
});

// Delete book functionality
const deleteBookButtons = document.querySelectorAll("[data-delete-book]");
deleteBookButtons.forEach(button => {
    button.addEventListener("click", () => {
        let bookTarget = button.closest(".tile");
        deleteBook(bookTarget);
    })
});

function deleteBook(bookTile) {
    bookTile.remove();
}

// Read/Unread book functionality
const readToggles = document.querySelectorAll("[data-read-toggle]");
readToggles.forEach(button => {
    button.addEventListener("click", () => {
        let bookTarget = button.closest(".tile");
        let isRead = (button.dataset.readToggle == "true");
        if (isRead) {
            // When the button is pressed, if unread change to read. and vice versa.
            bookTarget.children[1].children[2].textContent = "Not read";
            button.textContent = "Read?"
        } else {
            bookTarget.children[1].children[2].textContent = "Read";
            button.textContent = "Unread?"
        }
    })
})