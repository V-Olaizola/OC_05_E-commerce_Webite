// On récupère l'ID du produit présent dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idTeddies = urlParams.get('id')

// Fonction qui récupère les infos du Teddy et les place dans le DOM
function fillProduct (nounourses) {
    for (let option of nounourses.colors) {
        let colorSelect = document.getElementById('couleur')
        let optionColor = document.createElement('option')
        optionColor.setAttribute('class', 'optionColor')
        optionColor.text = option
        colorSelect.add(optionColor)
    } 
    let teddyImg = document.getElementById('teddyImg')
    teddyImg.setAttribute('src', nounourses.imageUrl)
    let teddyName = document.getElementById('teddyName')
    teddyName.textContent = nounourses.name
    let teddyPrice = document.getElementById('teddyPrice')
    teddyPrice.textContent = nounourses.price/100
    let teddyDescription = document.getElementById('teddyDescription')
    teddyDescription.textContent = nounourses.description
}
// Fonction qui utilise la méthode Fetch pour obtenir les données des Teddies à partir de l'API
async function detailTeddy() {
    await fetch ('http://localhost:3000/api/teddies/' + idTeddies)
        .then((response) => response.json())
        .then((nounours) => fillProduct(nounours))
}

//On appelle la fonction
detailTeddy()
// Création du panier (localStorage)
function ajouter (){   // fonction appelée dans le bouton "Ajouter" en HTML
    let product = localStorage.getItem(idTeddies)
    product = JSON.parse(product)
    let quantite = document.getElementById('quantite')
    let couleur = document.getElementById('couleur')
    let prix = Number(document.getElementById('teddyPrice').textContent)
    let teddyDetails = {
        quantite: Number(quantite.value),
        couleur: couleur.value,
        prix: prix
    }
    if (!product){
        localStorage.setItem(idTeddies, JSON.stringify([teddyDetails]))
        cartCount()
    } else {
          for (let item of product) {
              if (item.couleur === couleur.value){
                  item.quantite += teddyDetails.quantite
                  localStorage.setItem(idTeddies, JSON.stringify(product)) 
                  cartCount()
                  return
              }
           }
          product.push(teddyDetails)
          localStorage.setItem(idTeddies,JSON.stringify(product))
          cartCount()
      }
} 

// Fonction qui indique la quantité d'objects présents dans le panier dans le Header
function cartCount() {
    let panier = document.getElementById('itemPanier')
    let total = 0
    for (let keys of Object.keys(localStorage)) {
        for (let product of JSON.parse(localStorage[keys])) {
            total += product.quantite
        }
    }
    panier.textContent = ("(" + total + ")")
}
//On appelle la fonction
cartCount()