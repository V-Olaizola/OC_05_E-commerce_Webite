//variables Globales
var url_string = window.location.href
var url = new URL(url_string);
var orderId = url.searchParams.get("OrderId");

function createDivOrderId(orderId) {
    let div = document.getElementById('confirm')
    let title = document.createElement('h4')
    let contenuTitle = document.createTextNode(`Merci pour votre confiance`)
    div.appendChild(title)
    title.appendChild(contenuTitle)
    let newDiv = document.createElement('p')
    let contenu = document.createTextNode(`Votre numéro de commande est : ${orderId}`)
    div.appendChild(newDiv)
    newDiv.appendChild(contenu)

    addTotalPriceOrder(div)
    localStorage.clear()
}

function addTotalPriceOrder(parent) {
    let total = 0
    for (let keys of Object.keys(localStorage)) {
        for (product of JSON.parse(localStorage[keys])) {
            let totalPriceProduct = product.quantite * product.prix
            total += totalPriceProduct
        }
    }
    let divPrice = document.createElement('p')
    let contenu = document.createTextNode("Le prix total de votre commande est de : " + total + "€")
    parent.appendChild(divPrice)
    divPrice.appendChild(contenu)
}

createDivOrderId(orderId)