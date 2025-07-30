

'use strict'


function onInit(){
    renderTable()
}

function renderTable() {
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
                <button class="btn delete" onclick="onRemoveBook('${book.id}', '${book.title}')">Delete</button>
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

function onRemoveBook(bookId, title){
    console.log('id to remove:', bookId)
    console.log(' title:', title)
    
    removeBook(bookId)

    renderTable()

    const txt = 'Book Removed Successfully!'
    showMsg(txt)
}

function onUpdateBook( bookId){
    updatePrice(bookId)

    renderTable()

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
    
        renderTable()
        const txt = 'Book Added Successfully!'
        showMsg(txt)
    }
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
