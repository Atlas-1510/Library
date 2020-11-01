// Array to store book objects in the library
const myLibrary = [];
// DOM element to display book objects
const libraryMain = document.getElementById("library");
// Global counter to give an index number to each book, to link tile DOM element with actual book object
let bookIndex = 0;


// Book Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

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
    let book = new Book(newTitle, newAuthor, newPages, newRead);
    myLibrary.push(book);
}

// Display library on screen
myLibrary.forEach((book) => {
    addBookToLibrary(book);
});


function newTile(book) {
    // Tile Header (title and buttons)
    // (title)
    let newBookTile = document.createElement("article");
    newBookTile.classList.add("tile");
    let tileHeader = document.createElement("div");
    tileHeader.classList.add("tileHeader");
    let tileTitle = document.createElement("h1");
    tileTitle.textContent = book.title;
    tileHeader.appendChild(tileTitle);
    // (buttons to read or delete)
    let buttonHolder = document.createElement("div");
    buttonHolder.classList.add("buttonHolder");
    let tileReadToggle = document.createElement("button");
    tileReadToggle.setAttribute("data-read-toggle", "");
    tileReadToggle.textContent = (book.read) ? "Unread?" : "Read?";
    buttonHolder.appendChild(tileReadToggle);
    let tileDeleteButton = document.createElement("button");
    tileDeleteButton.setAttribute("data-delete-book", "");
    tileDeleteButton.innerHTML = "&times;";
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
    // Add components to tile
    newBookTile.appendChild(tileHeader)
    newBookTile.appendChild(tileList);
    return newBookTile;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    // For each book, make a tile in the library and show the books information within that tile
    let tile = newTile(book);
    tile.setAttribute("data-book-index", bookIndex);
    bookIndex++;
    libraryMain.appendChild(tile);
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
    let bookAuthor = document.getElementById("bookAuthor").value;
    let bookPages = document.getElementById("bookPages").value;
    let bookRead = (document.querySelector('input[name="read"]:checked').value == "Read") ? true : false;
    let addBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    addBookToLibrary(addBook);
    let modal = addBookSubmitButton.closest(".modal");
    closeModal(modal);
});

// Delete book functionality
const deleteBookButtons = document.querySelectorAll("[data-delete-book]");
deleteBookButtons.forEach(button => {
    button.addEventListener("click", () => {
        console.log("active");
        button.closest(".tile").remove();
        let libraryIndex = button.closest(".tile").getAttribute("data-book-index");
        myLibrary.splice(libraryIndex, 1);
    })
});


// Read/Unread book functionality
const readToggles = document.querySelectorAll("[data-read-toggle]");
readToggles.forEach(button => {
    readToggleClickListener(button);
});

function refreshTile(tile) {
    // Need position the tile was in, remember so it can be put back in same position
    let allNodes = Array.from(libraryMain.childNodes);
    let tilePosition = allNodes.indexOf(tile);
    if (tilePosition == allNodes.length - 1) {
        tilePosition = null;
    }
    let bookSourceIndex = tile.getAttribute("data-book-index");

    libraryMain.removeChild(tile);

    // recreate the tile, and add it back in the position it was in before.
    let refreshedTile = newTile(myLibrary[bookSourceIndex]);
    refreshedTile.setAttribute("data-book-index", bookSourceIndex);
    libraryMain.insertBefore(refreshedTile, libraryMain.childNodes[tilePosition])

    // Add a new click event listener to the newly created button
    let button = refreshedTile.querySelector(".tileHeader .buttonHolder [data-read-toggle]");
    readToggleClickListener(button);
}

function readToggleClickListener(button) {
    button.addEventListener("click", () => {
        // Get the book and then run the function on that book
        let book = myLibrary[button.closest(".tile").getAttribute("data-book-index")];
        button.textContent = (book.read) ? "Read" : "Unread";
        book.read = !book.read;
        refreshTile(button.closest(".tile"));
    })
}





