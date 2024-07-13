const myLibrary = [];

const genres = {
    "children": "child.png",
    "comedy": "comedy.png",
    "fantasy": "dragon.png",
    "historic": "coliseum.png",
    "horror": "knife.png",
    "mystery": "mystery.png",
    "romance": "hearts.png",
    "sci-fi": "space.png",
    "self-help": "self-help.png",
    "other": "book.png"
}

const newBookButton = document.querySelector("#new-book");

const addBookDialog = document.querySelector(".add-book-dialog");
const closeAddBookDialog = document.querySelector(".add-book-dialog .close-button");

const editBookDialog = document.querySelector(".edit-book-dialog");
const closeEditBookDialog = document.querySelector(".edit-book-dialog .close-button");
const saveEdit = document.querySelector(".edit-book-dialog .save-button");

const deleteDialog = document.querySelector(".delete-dialog");
const closeDeleteButton = document.querySelector(".delete-dialog .close-button");
const confirmDeleteButton = document.querySelector(".confirm-delete");

const genreSelectors = document.querySelectorAll(".dialog-genre select");

const newGenreSelector = document.querySelector("#new-book-form .dialog-genre select");
const newSelectorImg = document.querySelector("#new-book-form .dialog-genre img");

const newBookForm = document.querySelector("#new-book-form");
const newFormTitle = document.querySelector("#new-book-form .main-title");
const newFormSubtitle = document.querySelector("#new-book-form .subtitle");
const newFormGenre = document.querySelector("#new-book-form .genre");
const newFormAuthor = document.querySelector("#new-book-form .author");
const newFormPages = document.querySelector("#new-book-form .pages");
const newFormRead = document.querySelector("#new-book-form .read");

const editGenreSelector = document.querySelector("#edit-book-form .dialog-genre select");
const editSelectorImg = document.querySelector("#edit-book-form .dialog-genre img");

const editBookForm = document.querySelector("#edit-book-form");
const editFormTitle = document.querySelector("#edit-book-form .main-title");
const editFormSubtitle = document.querySelector("#edit-book-form .subtitle");
const editFormGenre = document.querySelector("#edit-book-form .genre");
const editFormAuthor = document.querySelector("#edit-book-form .author");
const editFormPages = document.querySelector("#edit-book-form .pages");
const editFormRead = document.querySelector("#edit-book-form .read");

const deleteBookForm = document.querySelector("#delete-book-form");
const deleteFormTitle = document.querySelector("#delete-book-form .main-title");
const deleteFormSubtitle = document.querySelector("#delete-book-form .subtitle");
const deleteFormGenreImg = document.querySelector("#delete-book-form .dialog-genre img");
const deleteFormGenre = document.querySelector("#delete-book-form .genre");
const deleteFormAuthor = document.querySelector("#delete-book-form .author");
const deleteFormPages = document.querySelector("#delete-book-form .pages");
const deleteFormRead = document.querySelector("#delete-book-form .read");

const libraryDiv = document.querySelector(".library");

//const newBook = document.getElementById("new-book");
//newBook.addEventListener("click", () => {
//    addBookToLibrary(new Book());
//});

function Book(author, title, subtitle, genre, pages, read) {
    this.author = author;
    this.title = title;
    this.subtitle = subtitle;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book", "grid-template");
    bookDiv.dataset.index = myLibrary.length - 1;
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("order-num");
    orderDiv.textContent = myLibrary.length;
    const genreDiv = document.createElement("div");
    const genreImg = document.createElement("img");
    genreImg.src = "images/" + genres[book.genre];
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    const mainTitleDiv = document.createElement("div");
    mainTitleDiv.classList.add("main-title");
    mainTitleDiv.textContent = book.title;
    const subtitleDiv = document.createElement("div");
    subtitleDiv.classList.add("subtitle");
    subtitleDiv.textContent = book.subtitle;
    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author");
    authorDiv.textContent = book.author;
    const pagesDiv = document.createElement("div");
    pagesDiv.classList.add("pages", "center-items");
    pagesDiv.textContent = book.pages;
    const readDiv = document.createElement("div");
    if (book.read) {
        readDiv.classList.add("read", "true", "center-items");
        readDiv.textContent = "\u2714";
    }
    else {
        readDiv.classList.add("read", "false", "center-items");
        readDiv.textContent = "\u2718";
    }
    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("center-items");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", () => {

        deleteDialog.dataset.index = bookDiv.dataset.index;

        const index = editBookDialog.dataset.index;
        const genreImg = bookDiv.querySelector("img");
        const mainTitleDiv = bookDiv.querySelector(".main-title");
        const subtitleDiv = bookDiv.querySelector(".subtitle");
        const authorDiv = bookDiv.querySelector(".author");
        const pagesDiv = bookDiv.querySelector(".pages");
        const readDiv = bookDiv.querySelector(".read");

        const genreSelect = document.querySelector(`[value='${book.genre}']`);

        deleteFormTitle.value = mainTitleDiv.textContent;
        deleteFormSubtitle.value = subtitleDiv.textContent;
        deleteFormGenreImg.src = genreImg.src;
        deleteFormGenre.value = genreSelect.textContent;
        deleteFormAuthor.value = authorDiv.textContent;
        deleteFormPages.value = pagesDiv.textContent;
        if (readDiv.classList.contains("true")) {
            deleteFormRead.checked = true;
        }
        else {
            deleteFormRead.checked = false;
        }

        deleteDialog.showModal();
    });

    const trashIcon = document.createElement("img");
    trashIcon.src = "images/trash.svg";
    trashIcon.classList.add("trash-icon");
    deleteButton.appendChild(trashIcon);
    deleteDiv.appendChild(deleteButton);

    genreDiv.appendChild(genreImg);
    titleDiv.append(mainTitleDiv, subtitleDiv);

    bookDiv.append(orderDiv, genreDiv, titleDiv, authorDiv, pagesDiv, readDiv, deleteDiv);

    libraryDiv.appendChild(bookDiv);

    titleDiv.addEventListener("click", () => {
        editBookDialog.dataset.index = bookDiv.dataset.index;
        editGenreSelector.value = book.genre;
        editSelectorImg.src = genreImg.src;
        editFormTitle.value = book.title;
        editFormSubtitle.value = book.subtitle;
        editFormAuthor.value = book.author;
        editFormPages.value = book.pages;
        if (readDiv.classList.contains("true")) {
            editFormRead.checked = true;
        }
        else {
            editFormRead.checked = false;
        }
        editBookDialog.showModal();
    });

    newSelectorImg.src = "images/book.png";
    newBookForm.reset();
}

editBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const index = editBookDialog.dataset.index;
    const book = myLibrary[index];
    const bookDiv = libraryDiv.querySelector(`[data-index='${index}']`)
    const genreImg = bookDiv.querySelector("img");
    const mainTitleDiv = bookDiv.querySelector(".main-title");
    const subtitleDiv = bookDiv.querySelector(".subtitle");
    const authorDiv = bookDiv.querySelector(".author");
    const pagesDiv = bookDiv.querySelector(".pages");
    const readDiv = bookDiv.querySelector(".read");

    book.genre = editGenreSelector.value;
    genreImg.src = editSelectorImg.src;
    book.title = editFormTitle.value;
    book.subtitle = editFormSubtitle.value;
    book.author = editFormAuthor.value;
    book.pages = editFormPages.value;
    if (editFormRead.checked) {
        book.read = true;
        readDiv.classList.remove("false");
        readDiv.classList.add("true");
        readDiv.textContent = "\u2714";
    }
    else {
        book.read = false;
        readDiv.classList.remove("true");
        readDiv.classList.add("false");
        readDiv.textContent = "\u2718";
    }
    mainTitleDiv.textContent = book.title;
    subtitleDiv.textContent = book.subtitle;
    authorDiv.textContent = book.author;
    pagesDiv.textContent = book.pages;

    editBookDialog.close();
});

newBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
});

closeAddBookDialog.addEventListener("click", () => {
    addBookDialog.close();
});

closeEditBookDialog.addEventListener("click", () => {
    editBookDialog.close();
});

closeDeleteButton.addEventListener("click", () => {
    deleteDialog.close();
});

deleteDialog.addEventListener("submit", (event) => {
    event.preventDefault();
    
    myLibrary.splice(deleteDialog.dataset.index, 1);
    const bookDiv = libraryDiv.querySelector(`[data-index='${deleteDialog.dataset.index}']`);
    bookDiv.remove();
    const bookDivs = libraryDiv.querySelectorAll(".book");
    bookDivs.forEach((bookDiv, i) => {
        bookDiv.dataset.index = i;
        bookDiv.querySelector(".order-num").textContent = i + 1;
    });
    deleteDialog.close();
});

newGenreSelector.addEventListener("change", () => {
    const imgName = genres[newGenreSelector.value];
    newSelectorImg.src = "images/" + imgName;
});

editGenreSelector.addEventListener("change", () => {
    const imgName = genres[editGenreSelector.value];
    editSelectorImg.src = "images/" + imgName;
});

newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newBook = new Book(newFormAuthor.value, newFormTitle.value, newFormSubtitle.value, newFormGenre.value, newFormPages.value, newFormRead.checked);
    addBookToLibrary(newBook);
    addBookDialog.close();
});

const exampleBook = new Book("Patrick Rothfuss", "The Name of the Wind", "Kingkiller Chronicles Book 1", "fantasy", 676, true);
addBookToLibrary(exampleBook);

