

'use strict'


function saveToStorage(key,val){
    const json = JSON.stringify(val)
    localStorage.setItem(key,json)
}

function loadFromStorage(key){
    const json = JSON.parse(localStorage.getItem(key))
    return json
}