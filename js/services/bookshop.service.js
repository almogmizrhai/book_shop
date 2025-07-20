

'use strict'


const books = [
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

