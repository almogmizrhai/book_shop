

'use strict'


function onInit(){
    createBooks()
    renderTable(gBooks)
}

function renderTable(books){
    var strHtml = `
    <thead>
     <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Actions</th>
     </tr>
     </thead>
     <tbody>
     `
    for(var i=0; i<books.length; i++){
        const book = books[i]
        strHtml += `<tr>
        <td>${book.title} </td>
        <td>${book.price} </td>
        <td>
        <button class="btn read" onclick="onReadBook('${book.id}')" >Read</button>
        <button class="btn update" onclick="onUpdateBook(event, '${book.id}')">Update</button>
        <button class="btn delete" onclick="onRemoveBook(event, '${book.id}')">Delete</button>
        </td>
        </tr>`
    }
    strHtml +='</tbody>'

    document.querySelector('.book-table').innerHTML = strHtml
}

function onRemoveBook(ev, bookId){
    removeBook(bookId)

    renderTable(gBooks)
}

function onUpdateBook(ev, bookId){
    updatePrice(bookId)

    renderTable(gBooks)
}

function onAddBook(){
    const newBookTitle = prompt('please enter the name of the new book:')
    const newBookPrice = +prompt('please enter the new price:')
    addBook(newBookTitle,newBookPrice)

    renderTable(gBooks)
}

function onReadBook(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    if (!book) return

    document.getElementById('display-title').innerText = book.title
    document.getElementById('display-price').innerText = 'Price: ' + book.price + '₪'
    document.getElementById('display-book').style.display = 'block'
}

function onCloseDisplay() {
    document.getElementById('display-book').style.display = 'none'
}

function onSearchBook(searchValue){
    const bookTitle = searchBook(searchValue)
    renderTable(bookTitle)
}