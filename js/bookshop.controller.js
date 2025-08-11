

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
    if (!books || !books.length) {
        const txt = 'No Books Found!'
        showMsg(txt)
        return
    }

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
    if (!books || !books.length) {
        strHtml = '<div class="book-card">No Books Found!</div>'
    } else {
        books.forEach(book => {
            strHtml += `
            <div class="book-card">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-speed">The price is: <span class="price">${book.price}</span> ₪</p>
                <div class="book-actions">
                    <button class="read" onclick="onReadBook('${book.id}')">Read</button>
                    <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
                    <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
                </div>
            </div>
            `
        })
    }
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
    if(!books || !books.length) {
        strHtml = `<tr>
        <td> No Books Found!</td>
        </tr>
        `
    }else{
        books.forEach(book => {
            strHtml += `
            <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
            <button class="read" onclick="onReadBook('${book.id}')">Read</button>
            <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
            </td>
            </tr>
            `
        })
        strHtml += '</tbody>'
    }
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
    var elPopUp = document.querySelector('.pop-up-user-msg')
    var strHtml=`<div class="add-book">
                    <h2>Add a New Book</h2>
                    <span class="label">
                        <label for="bookTitle">Title:</label>
                        <input type="text" id="bookTitle">
            
                        <label for="bookPrice">Price:</label>
                        <input type="number" id="bookPrice">
                    </span>                
                    
                    <span class="btn-group">
                        <button class="save" onclick="onSaveNewBook()">Save</button>
                        <button class="cancel" onclick="onCloseDisplay()">Cancel</button>
                    </span>
                </div>
    `
    elPopUp.innerHTML = strHtml
    elPopUp.classList.remove('hide')
}

function onSaveNewBook() {
    const title = document.querySelector('#bookTitle').value
    const price = +document.querySelector('#bookPrice').value
    
    if (!title || !title.trim() ||  isNaN(price) || price <= 0){
        const txt = 'The information you entered is incorrect.'
        showMsg(txt)
        return
    }else{
        addBook(title, price)
        renderBook()
        onCloseDisplay()
        const txt = 'Book Added Successfully!'
        showMsg(txt)
    }
}

function onReadBook(bookId) {
    const book = readBook(bookId)
    if (!book) return
    var elPopUp = document.querySelector('.pop-up-user-msg')
    var strHtml = `<div class="pop-up-book">
    <h2 class="pop-up-title">${book.title}</h2>
    <p class="pop-up-price">Price: ${book.price}₪</p>
    <button class="close" onclick="onCloseDisplay()">X</button>
    </div> 
    `
    elPopUp.innerHTML = strHtml
    elPopUp.classList.remove('hide')
}

function onCloseDisplay() {
    document.querySelector('.pop-up-user-msg').classList.add('hide')
}

function onSearchBook(searchValue){
    searchBook(searchValue)
    renderBook()
}
