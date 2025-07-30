

'use strict'

var gBooks = []
const STORAGE_KEY = 'books'
_createBooks()



function getBooks() {
    
    return gBooks
}

function _createBooks(){
    
    gBooks = loadFromStorage(STORAGE_KEY)

    if(gBooks && gBooks.length > 0) return

    gBooks = [
        getBook('The Adventures of Lori Ipsi',120),
        getBook('World Atlas',300),
        getBook('Zorba the Greek',87)
    ]
    _saveBooks()
}

function getBook(title, price){
    return {
        id: makeId(),
        title ,
        price ,
    }
}

function removeBook(bookId){
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx,1)
    _saveBooks()
}

function updatePrice(bookId){
    const newPrice = +prompt('please enter the new price:')
    const idx = gBooks.find(book => book.id === bookId)
    idx.price = newPrice
    _saveBooks()
}

function addBook(newBookTitle,newBookPrice){
    const newBook= getBook(newBookTitle,newBookPrice)
    gBooks.push(newBook)
    _saveBooks()
}

function searchBook(searchValue){
    const filterBook = gBooks.filter(book =>
        book.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    return filterBook
}

function _saveBooks(){
    saveToStorage(STORAGE_KEY, gBooks)
}

function getStats(){

    var totalCheap = 0
    var totalAverage = 0
    var totalExpensive = 0

    for(var i=0; i<gBooks.length; i++){
        if(gBooks[i].price < 80) {
            totalCheap ++
        } else if(gBooks[i].price < 200){
            totalAverage ++
        }else{
            totalExpensive ++
        }
    }

    const total = {cheap: totalCheap, average: totalAverage ,expensive: totalExpensive}

    return total
}