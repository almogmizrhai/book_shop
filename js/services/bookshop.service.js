

'use strict'


const gBooks = [
    getBook('The Adventures of Lori Ipsi',120),
    getBook('World Atlas',300),
    getBook('Zorba the Greek',87)
]

function getBook(title, price){
    return {
        id: makeId(),
        title ,
        price ,
    }
}

function removeBook(bookId){
    const idx = gBooks.find(book => book.id === bookId)
    gBooks.splice(idx,1)
}

function updatePrice(bookId){
    const newPrice = +prompt('please enter the new price:')
    const idx = gBooks.find(book => book.id === bookId)
    idx.price = newPrice
}

function addBook(newBookTitle,newBookPrice){
    const newBook= getBook(newBookTitle,newBookPrice)
    gBooks.push(newBook)
}
