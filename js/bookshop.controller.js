

'use strict'


function onInit(){
    renderBook()
}

function renderBook() {
    const books = getBooks()

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
    console.log(books)
    renderStats()
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
