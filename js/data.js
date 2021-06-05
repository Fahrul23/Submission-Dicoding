const STORAGE_KEY = "BOOK_APPS";
 
let books = [];


function isStorageExist() /* boolean */ {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        books = data;
  
    document.dispatchEvent(new Event("ondataloaded"));
 }

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}
function composeBookObject(judul, penulis,tahun, isCompleted) {
    return {
        id: +new Date(),
        judul,
        penulis,
        tahun,
        isCompleted
    };
}


function findBook(BookId) {
    for(book of books){
        if(book.id === BookId)
            return book;
    }
    return null;
}
function searchBook(keyword){
    for(book of books){
        if(book.judul === keyword)
            return book;
    }
}

 

function findBookIndex(bookId) {
    let index = 0
    for (book of books) {
        if(book.id === bookId)
            return index;
  
        index++;
    }
  
    return -1;
}
function refreshDataFromBook() {
    
    const listUncompleted = document.getElementById(NOT_COMPLETE_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_BOOK_ID);
  
  
    for(book of books){
        
        const NewBook = makeBook(book.judul,book.penulis,book.tahun,book.isCompleted);
        
        NewBook[BOOK_ITEMID] = book.id;
  
  
        if(book.isCompleted){
            listCompleted.append(NewBook);
        } else {
            listUncompleted.append(NewBook);
        }
    }
 }
 