

'use strict'


function onInit(){
    renderBook()
}

function onSetDisplayType(displayType) {
    gDisplayType = displayType
    renderBook()
}

function renderBook() {
    const books = getBooks()
    if (gDisplayType === 'table'){
        var elCard = document.querySelector('.book-cards')
        elCard.classList.add('hide')
        var elTable = document.querySelector('.book-table')
        elTable.classList.remove('hide')

        const txt = 'Book Shown in Table!'
        showMsg(txt)   
        readBookInTable(books)
    } 
    else if (gDisplayType === 'cards'){
        var elCard = document.querySelector('.book-cards')
        elCard.classList.remove('hide')
        var elTable = document.querySelector('.book-table')
        elTable.classList.add('hide')

        const txt = 'Book Shown in Cards!'
        showMsg(txt)   
        renderBookInCards(books)
    }
    renderStats()
}
 
function renderBookInCards(books) { 
    let strHtml = ''
    books.forEach(book => {
        strHtml += `
        <div class="book-card">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-speed">The price is: <span class="price">${book.price}</span> ₪</p>
        <div class="book-actions">
        <button class="btn read" onclick="onReadBook('${book.id}')">Read</button>
        <button class="btn update" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="btn delete" onclick="onRemoveBook('${book.id}')">Delete</button>
        </div>
        </div>
        `
    })
    document.querySelector('.book-cards').innerHTML = strHtml
}

function readBookInTable(books) {
    let strHtml = `
    <thead>
    <tr>
    <th>Title</th>
    <th>Price</th>
    <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    `
    books.forEach(book => {
        strHtml += `
        <tr>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td>
        <button class="btn read" onclick="onReadBook('${book.id}')">Read</button>
        <button class="btn update" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="btn delete" onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
        </tr>
        `
    })
    strHtml += '</tbody>' 
    document.querySelector('.book-table').innerHTML = strHtml
}

function renderStats(){
    const elTotalCheap = document.querySelector('.total-cheap')
    const elTotalAverage = document.querySelector('.total-average')
    const elTotalExpensive = document.querySelector('.total-expensive')

    const total = getStats()

    elTotalCheap.innerText ='Cheap:' + total.cheap
    elTotalAverage.innerText ='Average:' + total.average
    elTotalExpensive.innerText ='Expensive:' + total.expensive
}

function onRemoveBook(bookId){
    removeBook(bookId)
    renderBook()
    const txt = 'Book Removed Successfully!'
    showMsg(txt)
}

function onUpdateBook( bookId){
    const newPrice = +prompt('please enter the new price:')
    updatePrice(bookId, newPrice)
    renderBook()
    const txt = 'Book Updated Successfully!'
    showMsg(txt)
}

function onAddBook(){
    const newBookTitle = prompt('please enter the name of the new book:')
    const newBookPrice = +prompt('please enter the new price:')
    if (!newBookTitle || !newBookTitle.trim() ||  isNaN(newBookPrice) || newBookPrice <= 0){
        const txt = 'The information you entered is incorrect.'
        showMsg(txt)
        return
    }else{
        addBook(newBookTitle,newBookPrice)
    
        renderBook()
        const txt = 'Book Added Successfully!'
        showMsg(txt)
    }
}

function onReadBook(bookId) {
    console.log('Reading book with ID:', bookId)
    const book = readBook(bookId)
    if (!book) return
    
    document.querySelector('.display-title').innerText = book.title
    document.querySelector('.display-price').innerText = 'Price: ' + book.price + '₪'
    document.querySelector('.display-book').classList.add('show')
}

function onCloseDisplay() {
    document.querySelector('.display-book').classList.remove('show')
}

function onSearchBook(searchValue){
    searchBook(searchValue)
    renderBook()
}

function onDisplayBooks() {
    if (gDisplayType === 'table') {
        gDisplayType = 'cards'
        document.querySelector('.btn.btn-display').innerText = 'Display Books - Table'
    } else if (gDisplayType === 'cards') {
        gDisplayType = 'table'
        document.querySelector('.btn.btn-display').innerText = 'Display Books - Cards'
    }
    renderBook()
    const txt = `Books displayed in ${gDisplayType} format`
    showMsg(txt)
}