

'use strict'

var gBooks = []
const STORAGE_KEY = 'books'
var gDisplayType = 'table'
_createBooks()

function getBooks() { 
    return gBooks
}

function _createBooks(){
    
    gBooks = loadFromStorage(STORAGE_KEY)

    if(gBooks && gBooks.length > 0) return

    gBooks = [
        _getBook('The Adventures of Lori Ipsi',120),
        _getBook('World Atlas',300),
        _getBook('Zorba the Greek',87)
    ]
    _saveBooks()
}

function _getBook(title, price){
    return {
        id: makeId(),
        title ,
        price ,
    }
}

function removeBook(bookId){
    const idx = gBooks.findIndex(book => book.id === bookId)
    if (idx === -1) return
    gBooks.splice(idx,1)
    _saveBooks()
}

function updatePrice(bookId, newPrice){
    const idx = gBooks.find(book => book.id === bookId)
    if (idx === -1) return
    if (isNaN(newPrice) || newPrice <= 0) {
        const txt = 'The price you entered is incorrect.'
        showMsg(txt)
        return
    }
    idx.price = newPrice
    _saveBooks()
}

function readBook(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    return book 
}

function addBook(title,price){ 
    const newBook= _getBook(title,price)
    gBooks.push(newBook)
    _saveBooks()
}

function searchBook(searchValue) {
    const books = loadFromStorage(STORAGE_KEY)
    if (!searchValue) {
        gBooks = books
    } else {
        const regex = new RegExp(searchValue, 'i')
        gBooks = books.filter(book => regex.test(book.title))
    }
}

function _saveBooks(){
    saveToStorage(STORAGE_KEY, gBooks)
}

function getStats() {
    return gBooks.reduce((acc, book) => {
        if (book.price < 80) {
            acc.cheap++
        } else if (book.price < 200) {
            acc.average++
        } else {
            acc.expensive++
        }
        return acc
    }, { cheap: 0, average: 0, expensive: 0 }) 
}