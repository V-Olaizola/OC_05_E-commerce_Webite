// On récupère les détails des Teddies
async function recupererNounourses() {
    await fetch('http://localhost:3000/api/teddies')
    .then((response) => response.json())
    .then((nounourses) => teddies(nounourses))
}
// Appel de la fonction
recupererNounourses()

//On récupère l'ID section pour l'ajout au DOM des futurs éléments 
let section = document.getElementById('sectionIndex')

//Fonction qui récupère les infos Teddies pour les placer dans le DOM
function teddies(nounourses) {
    for (let teddy of nounourses){

        // Création éléments pour index html

        let produit = document.createElement('div')
        let produitImg = document.createElement('div')
        let produitDetail = document.createElement('div')
        let produitPic = document.createElement('img')
        let nomProduit = document.createElement('p')
        let prixProduit = document.createElement('p')
        let boutonInfo = document.createElement('button')
        let lienProduit = document.createElement('a')

        // Set Attribute pour index html
  
        produit.setAttribute("class", "produit")
        produitImg.setAttribute("class", "produitImg")
        produitDetail.setAttribute("class", "produitDetail")
        produitPic.setAttribute("class", "produitPic")
        nomProduit.setAttribute("class", "nomProduit")
        prixProduit.setAttribute("class", "prixProduit")
        boutonInfo.setAttribute("class", "boutonInfo")
        lienProduit.setAttribute("href", "produit.html?id=" + teddy._id)
  
      // Placement éléments pour index html 
      
        section.appendChild(produit)
        produit.appendChild(produitImg)
        produit.appendChild(produitDetail)
        produitImg.appendChild(produitPic)
        produitDetail.appendChild(nomProduit)
        produitDetail.appendChild(prixProduit)
        produitDetail.appendChild(boutonInfo)
        boutonInfo.appendChild(lienProduit)
  
        // Contenu éléments pour index html 
  
        nomProduit.textContent = teddy.name
        produitPic.src = teddy.imageUrl
        prixProduit.textContent = teddy.price/100 + "€"
        lienProduit.textContent = "+ d'infos"
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