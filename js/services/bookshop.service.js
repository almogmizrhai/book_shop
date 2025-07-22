

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
    console.log(idx)
    gBooks.splice(idx,1)
}