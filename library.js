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
const testBooks = [
    ["The Hobbit", "Tolkien", 295, false],
    ["Harry Potter", "J.R Rowling", 432, true],
    ["Dune", "Frank Herbert", 689, true],
    ["The Witcher", "Andrzej Sapkowski", 288, true],
]
if (debug) {
    for (let i = 0; i < testBooks.length; i++) {
        addBookFromArray(testBooks[i]);
    }
}

// Button to get rid of test books
let testbookToggle = document.getElementById('clearTestBooks');
testbookToggle.addEventListener("click", () => {
    let tiles = Array.from(library.querySelectorAll(".tile"));
    // Match the books in library to the books in the test array
    for (let i = 0; i < myLibrary.length; i++) {
        for (let j = 0; j < testBooks.length; j++) {
            if (myLibrary[i].title == testBooks[j][0]) {
                // Once a match is found, go through each tile until the correct tile for that book is found
                for (let k = 0; k < tiles.length; k++) {
                    let tile = tiles[k]
                    let tileTitle = tile.querySelector(".tileHeader").children[0].textContent;
                    if (tileTitle == myLibrary[i].title) {
                        let libraryIndex = tile.getAttribute("data-book-index");
                        library.removeChild(tile);
                        myLibrary.splice(libraryIndex, 1);
                        // for every tile that has a library index greater than the deleted tile, reduce by one to fill the gap
                        let remainingTiles = document.querySelectorAll(".tile");
                        remainingTiles.forEach(tile => {
                            let tileIndex = tile.getAttribute("data-book-index");
                            if (tileIndex > libraryIndex) {
                                tile.setAttribute("data-book-index", tileIndex - 1);
                            }
                        })
                        bookIndex = bookIndex - 1;
                        break
                    }
                }
            }
        }
    }
})
// Gets rid of the ugly blue border that highlights the 'remove test books' button when clicked
function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}
testbookToggle.addEventListener('keydown', handleFirstTab);



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
    // (buttons to read or delete)
    let buttonHolder = document.createElement("div");
    buttonHolder.classList.add("buttonHolder");
    let tileReadToggle = document.createElement("button");
    tileReadToggle.setAttribute("data-read-toggle", "");
    tileReadToggle.classList.add("tileButton", "readButton");
    tileReadToggle.textContent = (book.read) ? "Unread?" : "Read?";
    buttonHolder.appendChild(tileReadToggle);
    let tileDeleteButton = document.createElement("button");
    tileDeleteButton.setAttribute("data-delete-book", "");
    tileDeleteButton.classList.add("tileButton", "deleteButton");
    tileDeleteButton.innerHTML = "Delete";
    buttonHolder.appendChild(tileDeleteButton);
    // Add components to tile
    newBookTile.appendChild(tileHeader)
    newBookTile.appendChild(tileList);
    newBookTile.appendChild(buttonHolder)

    // Set tile background
    let colors = setTileColor();
    let colorOne = "#" + colors[0]
    let colorTwo = "#" + colors[1]
    let deg = Math.floor(Math.random() * 180);

    newBookTile.style.backgroundImage = `linear-gradient(${deg}deg, ${colorOne}, ${colorTwo})`;

    return newBookTile;
}

function setTileColor() {
    let colorArrays = [
        ["8d6b94", "b185a7", "c3a29e", "e8dbc5", "fff4e9"],
        ["dec5e3", "cdedfd", "b6dcfe", "a9f8fb", "81f7e5"],
        ["9f7e69", "d2bba0", "f2efc7", "f7ffe0", "ffeee2"],
        ["baa7b0", "b2abbf", "b1b5c8", "bfd5e2", "c7ebf0"],
        ["91a6ff", "ff88dc", "faff7f", "ffffff", "ff5154"],
        ["586994", "7d869c", "a2abab", "b4c4ae", "e5e8b6"],
        ["f9e7e7", "ded6d6", "d2cbcb", "ada0a6", "7d938a"],
        ["ccdbdc", "9ad1d4", "80ced7", "007ea7", "00628f"],
    ]

    let colorPalette = colorArrays[Math.floor(Math.random() * colorArrays.length)]
    let colorOne = colorPalette[Math.floor(Math.random() * colorPalette.length)]
    let colorTwo = colorPalette[Math.floor(Math.random() * colorPalette.length)]
    while (colorOne == colorTwo) {
        colorTwo = colorPalette[Math.floor(Math.random() * colorPalette.length)]
    }
    let returnArray = []
    returnArray.push(colorOne, colorTwo);
    return returnArray
}


function addBookToLibrary(book) {
    // For each book, make a tile in the library and show the books information within that tile
    let tile = newTile(book);
    tile.setAttribute("data-book-index", bookIndex);
    bookIndex++;
    addListeners(tile);
    libraryMain.appendChild(tile);
}

function addListeners(tile) {
    // Add button event listeners
    let deleteButton = tile.querySelector(".buttonHolder").querySelector(".deleteButton");
    deleteButtonClickListener(deleteButton);
    let readButton = tile.querySelector(".buttonHolder").querySelector(".readButton");
    readToggleClickListener(readButton);
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
    myLibrary.push(addBook);
    addBookToLibrary(addBook);
    let modal = addBookSubmitButton.closest(".modal");
    closeModal(modal);
});


function readToggleClickListener(button) {
    button.addEventListener("click", () => {
        // Get the book and then run the function on that book
        let book = myLibrary[button.closest(".tile").getAttribute("data-book-index")];
        button.textContent = (book.read) ? "Read" : "Unread";
        book.read = !book.read;
        refreshTile(button.closest(".tile"));
    })
}

function deleteButtonClickListener(button) {
    button.addEventListener("click", () => {
        // Library index (data-book-index) of book to be deleted
        let libraryIndex = button.closest(".tile").getAttribute("data-book-index");
        button.closest(".tile").remove();
        myLibrary.splice(libraryIndex, 1);
        // for every tile that has a library index greater than the deleted tile, reduce by one to fill the gap
        let remainingTiles = document.querySelectorAll(".tile");
        remainingTiles.forEach(tile => {
            let tileIndex = tile.getAttribute("data-book-index");
            if (tileIndex > libraryIndex) {
                tile.setAttribute("data-book-index", tileIndex - 1);
            }
        })
        bookIndex = bookIndex - 1;
    })
}


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
    addListeners(refreshedTile);
    libraryMain.insertBefore(refreshedTile, libraryMain.childNodes[tilePosition])


}