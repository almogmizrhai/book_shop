

'use strict'


function makeId(length =5){
    var id = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for(var i=0; i<length; i++){
        id+=possible.charAt(getRandomInt(0,possible.length))
    }
    return id
}

function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min)
	const maxFloored = Math.floor(max)
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}

function showMsg(txt) {
    var elMsg = document.querySelector('.user-msg')
    elMsg.innerHTML = txt

    elMsg.classList.add('show')

    setTimeout(() => {
        elMsg.classList.remove('show')
    }, 2000)
}
