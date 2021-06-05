const COMPLETED_BOOK_ID = "completed";
const NOT_COMPLETE_BOOK_ID = "list-book"
const BOOK_ITEMID = "itemId";

function addBook() {

    const NotCompleteBook = document.getElementById(NOT_COMPLETE_BOOK_ID);
    const CompleteBook = document.getElementById(COMPLETED_BOOK_ID);
    const judul = document.getElementById("judul").value;
    const penulis = document.getElementById("penulis").value;
    const tahun = document.getElementById("tahun").value;
    const selesai = document.getElementById("selesai").checked;
        
    
    if(selesai == true){
        
        const book = makeBook(judul,penulis,tahun,true);
        
        const bookObject = composeBookObject(judul, penulis,tahun,true);
        
        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
        
        CompleteBook.append(book);
        
        updateDataToStorage();
        
    }else{
        const book = makeBook(judul,penulis,tahun,false);

        const bookObject = composeBookObject(judul, penulis,tahun,false);
        
        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        NotCompleteBook.append(book);
        updateDataToStorage();
    }

}
function makeBook(judul,penulis,tahun,isCompleted) {
    
    const imgbook = document.createElement("div");
    imgbook.classList.add("img-book");
    
    const judulText = document.createElement("p");
    judulText.innerText= "Judul :";
    const juduldata = document.createElement("span");
    juduldata.innerText= judul;
    judulText.append(juduldata);
   
    const penulisText = document.createElement("p");
    penulisText.innerText= "Penulis :";
    const penulisdata = document.createElement("span");
    penulisdata.innerText= penulis;
    penulisText.append(penulisdata);
   
    const tahunText = document.createElement("p");
    tahunText.innerText= "Tahun :";
    const tahundata = document.createElement("span");
    tahundata.innerText= tahun;
    tahunText.append(tahundata);
   
    const contentbook = document.createElement("div");
    contentbook.classList.add("content-book");
    contentbook.append(judulText,penulisText,tahunText);
    
    const content = document.createElement("div");
    content.classList.add("content");
    content.append(imgbook,contentbook);
    
    const item = document.createElement("div")
    item.classList.add("item")
    item.append(content);

    if(isCompleted){
        item.append(createNotCompeletedButton());
    }else{
        item.append(createCompeletedButton());
    }
    item.append(createDeleteButton());

    return item;
}
function createButton(buttonTypeClass , textbutton,eventListener,) {
    const button = document.createElement("span");
    button.innerText = textbutton;
    button.classList.add("button-action");
    button.classList.add(buttonTypeClass);

    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}
function addBookToCompleted(bookElement) {
    
    const judulText = bookElement.querySelector('.content-book  > p:nth-child(1) span').innerText;
    const penulisText = bookElement.querySelector(".content-book > p:nth-child(2) span").innerText;
    const tahunText = bookElement.querySelector(".content-book > p:nth-child(3) span").innerText;
    const listCompletedBook = document.getElementById(COMPLETED_BOOK_ID);
    
    const NewBook = makeBook(judulText, penulisText,tahunText,true);
    
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    NewBook[BOOK_ITEMID] = book.id;

    listCompletedBook.append(NewBook);
    bookElement.remove();
    updateDataToStorage();
} 

function addBookToNotCompleted(bookElement) {
    
    const judulText = bookElement.querySelector('.content-book > p:nth-child(1) span').innerText;
    const penulisText = bookElement.querySelector(".content-book > p:nth-child(2) span").innerText;
    const tahunText = bookElement.querySelector(".content-book > p:nth-child(3) span").innerText;
    const listNotCompletedBook = document.getElementById(NOT_COMPLETE_BOOK_ID);
    
    const NewBook = makeBook(judulText, penulisText,tahunText,false);

    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    NewBook[BOOK_ITEMID] = book.id;
    listNotCompletedBook.append(NewBook);
    bookElement.remove();
    updateDataToStorage();

} 
function deleteBook(bookElement){

    let deleteConfirm = confirm("Apakah anda yakin ingin menghapus buku ini")
    if(deleteConfirm === true){        
        const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
        books.splice(bookPosition, 1);
        bookElement.remove();
        updateDataToStorage();
    }

}

function createCompeletedButton() {
    return createButton("success", "Selesai dibaca",function(event){
        addBookToCompleted(event.target.parentElement);
    });
}
function createNotCompeletedButton() {
    return createButton("success", "Belum Selesai dibaca",function(event){
        addBookToNotCompleted(event.target.parentElement);
    });
}
function createDeleteButton() {
    return createButton("danger","hapus",function(event){
        deleteBook(event.target.parentElement);
    });
}


const btnSearch= document.getElementById('btn-search');
btnSearch.addEventListener("click", function (event) {
    searchBooks();
});
function searchBooks(){
    const keyword = document.getElementById("search").value;

    const NotCompleteBook = document.getElementById(NOT_COMPLETE_BOOK_ID);
    const CompleteBook = document.getElementById(COMPLETED_BOOK_ID);
    
    const book = searchBook(keyword);
    
    
    if(book){
    
        const newbook = makeBook(book.judul,book.penulis,book.tahun,book.isCompleted);
        newbook[BOOK_ITEMID] = book.id;
        
        if(book.isCompleted === true){
            CompleteBook.innerHTML = ' ';
            NotCompleteBook.innerHTML = ' ';
            CompleteBook.append(newbook);
        }else{
            NotCompleteBook.innerHTML = ' ';
            CompleteBook.innerHTML = ' ';
            NotCompleteBook.append(newbook);
        }
    }else{
        
        const notFoundBookComplete = document.createElement('div');
        notFoundBookComplete.classList="not-found"

        const textNotFoundBookComplete = document.createElement('h2');
        textNotFoundBookComplete.innerText="Buku yang Anda Cari Tidak Ditemukan";

        notFoundBookComplete.append(textNotFoundBookComplete);

        const notFoundBookNotComplete = document.createElement('div');
        notFoundBookNotComplete.classList="not-found"

        const textNotFoundBookNotComplete = document.createElement('h2');
        textNotFoundBookNotComplete.innerText="Buku yang Anda Cari Tidak Ditemukan";

        notFoundBookNotComplete.append(textNotFoundBookNotComplete);

        CompleteBook.innerHTML = ' ';
        CompleteBook.append(notFoundBookComplete);
        NotCompleteBook.innerHTML = ' ';
        NotCompleteBook.append(notFoundBookNotComplete);


    }

}

