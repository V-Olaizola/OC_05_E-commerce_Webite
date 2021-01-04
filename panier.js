 // On récupère les infos Teddies avec Fetch et en utilisant la Key de l'objet 
 async function recupDetails(key) {
    await fetch('http://localhost:3000/api/teddies/' + key)
    .then((response) => response.json())
    .then((nounoursDetail) => createCard(key, nounoursDetail.imageUrl, nounoursDetail.name, nounoursDetail.price))
}

// Fonction condition qui affiche un message si le panier est vide ou les détails de (des) objets dans le panier
function panierCreation () {
    let recapPanier = document.getElementById('recapPanier')
    if (localStorage.length == 0) {
        recapPanier.innerHTML = "Votre panier est vide"
        document.getElementById('viderPanier').style.display = "none"
        document.getElementById('prixTotal').style.display = "none"
    } else {   
        for (let key of Object.keys(localStorage)) {
            recupDetails(key)
        }
    }
}

//On se sert de la fonction créee avec Fetch pour créer nos éléments et les incorporer dans le DOM
function createCard(key, imgUrl, teddyName, teddyPrice){
    let recapPanier = document.getElementById('recapPanier')
    for (let product of JSON.parse(localStorage[key])) {

        // Création de variables/éléments
        let divProduit = document.createElement('div')
        let image = document.createElement('img')
        let nom = document.createElement('div')
        let couleur = document.createElement('div')
        let quantite = document.createElement('div')
        let prix = document.createElement('div')

        // Ajout des classes
        divProduit.setAttribute('class', 'divProduit')
        image.setAttribute('class', 'imagePanier')
        nom.setAttribute('class', 'nomPanier')
        couleur.setAttribute('class', 'couleurPanier')
        quantite.setAttribute('class', 'quantitePanier')
        prix.setAttribute('class', 'prixPanier')

        // Ajout au DOM
        recapPanier.appendChild(divProduit)
        divProduit.appendChild(image)
        divProduit.appendChild(nom)
        divProduit.appendChild(couleur)
        divProduit.appendChild(quantite)
        divProduit.appendChild(prix)

        // Ajout des valeurs
        image.src = imgUrl
        nom.textContent = teddyName
        couleur.textContent = product.couleur
        quantite.textContent = product.quantite
        prix.textContent = "Prix unitaire : " + teddyPrice/100 + "€"
    }
}
//On appelle la fonction
panierCreation ()

// Fonction pour vider le panier, appelé quand on clique sur le bouton "Vider Panier" en HTML
function viderPanier (){
    localStorage.clear()
    window.location.reload()
}

// Calcul du prix Total du panier
function totalPrice() {
    let price = document.getElementById('totalPrice')
    let total = 0
    for (let keys of Object.keys(localStorage)) {
        for (product of JSON.parse(localStorage[keys])) {
            let totalPriceProduct = product.quantite * product.prix
            total += totalPriceProduct
        }
    }
    price.textContent = total
} 
// On appelle la fonction
totalPrice()


//Validation du formulaire

let validerCommande = document.getElementById('commander')

function sendOrderApi(event){

    // Création de variables pour récupérer les données du formulaire 
    let prenom = document.getElementById('prenom')
    let nom = document.getElementById('nom')
    let adresse = document.getElementById('adresse')
    let ville = document.getElementById('ville')
    let email = document.getElementById('email')

    // Variables pour effectuer les tests de caractère sur les champs du formulaire avec REGEX
    let testNomVilleValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/
    let adresseValid = /^[A-Z-a-z-0-9\s]{5,80}$/
    let emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    //vérification si le champ nom contient des caractères interdits
    if (testNomVilleValid.test(nom.value) == false){
        event.preventDefault()
        alert("votre nom n'est pas conforme")
    //vérification si le champ prénom contient des caractères interdits
    } else if (testNomVilleValid.test(prenom.value) == false){
        event.preventDefault()
        alert("votre prénom n'est pas conforme")
    //vérification si le champ adresse contient des caractères interdits
    } else if (adresseValid.test(adresse.value) == false){
        event.preventDefault()
        alert("votre adresse n'est pas conforme")
    //vérification si le champ ville contient des caractères interdits
    } else if (testNomVilleValid.test(ville.value) == false){
        event.preventDefault()
        alert("votre ville n'est pas conforme")
    } else if (emailValid.test(email.value) == false){
        event.preventDefault()
        alert("votre adresse mail n'est pas conforme")
    } else {
        event.preventDefault()
      }
    //reccup les données rempli dans le formulaire
    let contact = {
        firstName: nom.value,
        lastName: prenom.value,
        address: adresse.value,
        city: ville.value,
        email: email.value,
    }

    //Reccup les id des produit présent dans le localstorage
    let products = Object.keys(localStorage)

    //regroupe les données a envoyer (contact et id product)
    let dataSend = {
        contact,
        products,
    }

    //Fonction permettant l'envoie des données a l'API
    const sendApi = async function (data) {
        try {
            let reponse = await fetch (`http://localhost:3000/api/teddies/order`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-type': 'application/json'
                }
            })
    //Si la reponse de l'API est OK alors on reccup les données, ouvre la page html confirmation avec order id dans url
            if (reponse.ok){
                let donnees = await reponse.json()
                window.location = 'confirmation.html?OrderId=' + donnees.orderId
    //Si pas OK alors on affiche l'erreur en reponse
            } else {
                event.preventDefault()
                alert ("L'erreur rencontrée est : " + reponse.status)
              }
        } 
        catch (error){
        alert ("erreur : " + error)
        }
    }
    //Appel de la focntion async pour la requete POST
    sendApi(dataSend)
}

    //Clic avec appel de la fonction de verif et envoie a l'API
    validerCommande.addEventListener('click', sendOrderApi)

//Envoi du formulaire vers l'API

/* async function dataToApi(){

let nom = document.getElementById('nom')
let prenom = document.getElementById('prenom')
let email = document.getElementById('email')
let adresse = document.getElementById('adresse')
let ville = document.getElementById('ville')

let contact = {
    prenom: prenom.value,
    nom: nom.value,
    email: prenom.value,
    address: adress.value,
    city: ville.value
}

let products = Object.keys(localStorage)
        
let panierConfirm = document.getElementById('commander')

let dataSend = {
    contact,
    products
}

const options = {
    method:'POST',
    body: JSON.stringify(dataSend),
    headers: {
      'Content-type': 'application/json'
    }
}

const reponse = await fetch('http://localhost:3000/api/teddies/order', options)
const donnees = await reponse.json()
window.location = 'confirmation.html?orderId=' + donnees.orderId

} */

// validerCommande.addEventListener('click', dataToApi)