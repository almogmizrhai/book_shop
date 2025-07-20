

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
    for(var i=0; i<books.length; i++){
        const book = books[i]
        strHtml += `<tr>
        <td>${book.title} </td>
        <td>${book.price} </td>
        <td>
        <button class="btn read">Read</button>
        <button class="btn update">Update</button>
        <button class="btn delete">Delete</button>
        </td>
        </tr>`
    }
    strHtml +='</tbody>'

    document.querySelector('.book-table').innerHTML = strHtml
}

