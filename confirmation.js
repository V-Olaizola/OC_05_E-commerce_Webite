// On récupère l'OrderId du produit présent dans l'URL
const url_string = window.location.href
const url = new URL(url_string);
const orderId = url.searchParams.get("OrderId");

// Fonction qui affiche le message de remerciement, la référence et le prix total
createDivOrderId = orderId => {
    let div = document.getElementById('confirm')
    let title = document.createElement('h4')
    let contenuTitle = document.createTextNode(`Merci pour votre confiance`)
    div.appendChild(title)
    title.appendChild(contenuTitle)
    let newDiv = document.createElement('p')
    let contenu = document.createTextNode(`Votre numéro de commande est : ${orderId}`)
    div.appendChild(newDiv)
    newDiv.appendChild(contenu)

    totalPrice(div)
    localStorage.clear()
}

// Fonction qui calcule le prix total de la commande
totalPrice = parent => {
    let total = 0
    for (let keys of Object.keys(localStorage)) {
        for (product of JSON.parse(localStorage[keys])) {
            let totalPriceProduct = product.quantite * product.prix
            total += totalPriceProduct
        }
    }
    let divPrice = document.createElement('p')
    let contenu = document.createTextNode(`Le prix total de votre commande est de : ${total} €`)
    parent.appendChild(divPrice)
    divPrice.appendChild(contenu)
}

// On appelle la fonction
createDivOrderId(orderId)