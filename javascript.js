/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////// book and library ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let myLibrary = [];

class Book {
    constructor(title,author,page_count,readStatus){
        this.title = title,
        this.author = author,
        this.page_count = page_count,
        this.readStatus = readStatus
    }
}

class Library{
    constructor(){
        this.bookList=[];
    }
    addToLibrary(newBook){
        this.bookList.push(newBook)
    }
    inLibrary(newBook) {
        return this.bookList.some((book) => book.title == newBook.title)
    }
    removeBook(title){
        this.bookList = this.bookList.filter((book) => book.title !== title )
    }
}

const library = new Library();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// generate book /////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const bookForm = document.getElementById("bookForm")

const addBook = (e) => {
    e.preventDefault()
    const newBook = getBookFromInput()
  
    if (library.inLibrary(newBook)) {
      error_modal.style.display = "block";
      return
    }
  
    
    library.addToLibrary(newBook)
    displayBooks();
    
    bookModal.style.display = "none";
}

const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const page_count = document.getElementById('page-count').value
    const readStatus = document.getElementById('readStatus').checked
    return new Book(title, author, page_count, readStatus)
}

bookForm.onsubmit = addBook;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// update library display ////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const library_display = document.getElementById("library-display");

const genBookCard = (book) => {

    const bookCard = document.createElement("div");

    const title = document.createElement("p");
    const author = document.createElement("p");
    const page_count = document.createElement("p");
    const buttonBlock = document.createElement('div');
    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(page_count);
    bookCard.appendChild(buttonBlock);
    
    buttonBlock.appendChild(readButton);
    buttonBlock.appendChild(removeButton);

    readButton.onclick = toggleReadStatus;
    removeButton.onclick = removeBook;

    library_display.appendChild(bookCard);

    bookCard.classList.add("book-card")

    title.textContent = `"${book.title}"`;
    author.textContent = `"${book.author}"`;
    page_count.textContent = `"${book.page_count}"`;
    removeButton.textContent = "Remove Book";

    if (book.readStatus) {
        readButton.textContent = "Read";
    } else {
        readButton.textContent = "Haven't Read";
    }

}

const displayBooks = () => {
    library_display.innerHTML="";
    for (let book of library.bookList){
        genBookCard(book)
    }
}

const toggleReadStatus = (e) => {
    console.log(e)
}

const removeBook = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"','')
    library.removeBook(title)
    displayBooks()
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////// modal /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const openBookButton = document.getElementById("addBookButton");
const bookModal = document.getElementById("book-modal");
// const span = document.getElementById("close-modal");
const span = document.getElementsByClassName("close-modal");
const error_modal = document.getElementById("error-modal");

openBookButton.onclick = function() {
    bookModal.style.display = "block";
}

span[0].onclick = function() {
    bookModal.style.display = "none";
}
span[1].onclick = function() {
    error_modal.style.display = "none";
}