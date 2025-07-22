

'use strict'


function onInit(){
    renderTable()
}

function renderTable(){
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
    for(var i=0; i<gBooks.length; i++){
        const book = gBooks[i]
        strHtml += `<tr>
        <td>${book.title} </td>
        <td>${book.price} </td>
        <td>
        <button class="btn read" >Read</button>
        <button class="btn update" onclick="onUpdateBook(event, '${book.id}')">Update</button>
        <button class="btn delete" onclick="onRemoveBook(event, '${book.id}')">Delete</button>
        </td>
        </tr>`
    }
    strHtml +='</tbody>'

    document.querySelector('.book-table').innerHTML = strHtml
}

function onUpdateBook(ev, bookId){
    updatePrice(bookId)

    renderTable()
}

function onRemoveBook(ev, bookId){
    console.log(ev)
    removeBook(bookId)

    renderTable()
}
