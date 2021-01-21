// Récuperation de l'id dans l'url
const recupereIdUrl = () => {
    let params = (new URL(document.location)).searchParams;
    let teddiesId = params.get('id');
    return teddiesId;
}
const url = "http://localhost:3000/api/teddies/" + recupereIdUrl();

// Recupere données de l'id récupérer
async function telechargeData(){
     await fetch(url)
    .then((response) => 
            response.json()
    .then((data) => {
        // console.log(data);
        afficherUnArticle(data);
    })        
).catch(err => console.log('Erreur : ' + err));
}

telechargeData();


                // LES FONCTIONS

const boxTeddie = document.querySelector('.box_detail');
const afficherUnArticle = (data) => {
    let articleChoisie = document.createElement("div");
    articleChoisie.innerHTML =
    `<div class="card text-center col-12 " > 
            <div class="card-header">
                <h2> ${data.name}</h2>
                <p> ${data.price} € </p> 
            </div>
            <div class="card-body">
                <img class="card-img-top" src="${data.imageUrl}" alt="">
                <p class="card-text">${data.description} </p> 
            </div>
            <div class="card-footer text-dark">
                <form>
                    <div class="form-group">
                        <label for="quantite">Quantité</label>
                        <select class="form-control" id="quantite" name="quantité"></select>
                    </div>
                    <div class="form-group">
                        <label>Choisissez une couleur </label>
                        <select class="form-control" id="choixCouleur"></select> 
                    </div>
                </form>
            </div>
        </div>`;
 boxTeddie.appendChild(articleChoisie);
 selectionneQuantité();
 couleurArticle(data);
}

// Nombre d'article qu'on souhaite
const selectionneQuantité = () => {
    let quantiteArticle = document.querySelector('#quantite')
    for(let i = 1; i <= 10; i++){ 
        let choixQuantité = document.createElement("option")
        choixQuantité.innerText += i;
        quantiteArticle.append(choixQuantité);
    }
}

// Choix de la couleur du nounours
const couleurArticle = (data) => {
    let couleur = document.querySelector('#choixCouleur')
    for(let i = 0; i < data.colors.length; i++){
        let couleurChoisie = document.createElement("option");
        couleurChoisie.innerText = data.colors[i];
        couleur.append(couleurChoisie);
    }
}


// LocalStorage

const validerArticle = document.querySelector(".btnAjouterPanier");

async function envoyerDonneesLs(){
        await fetch(url)
    .then((response) => 
            response.json()
    .then((data) => {
        // console.log(data);
            validerArticle.addEventListener("click", ()=>{ // Ajout dans le panier après le click sur le bouton
                let choixTeddie = { 
                    Id : data._id,
                    Nom : data.name,
                    Image : data.imageUrl,
                    Prix : data.price,
                    Couleur : document.querySelector('#choixCouleur').value,
                    Nombre : parseInt(document.querySelector('#quantite').value)
                }

                let panier = JSON.parse(localStorage.getItem('article'));
                if(panier === null || panier === "undefined") {
                    panier = [];
                }
                if(panier) {
                    panier.push(choixTeddie);
                }
                localStorage.setItem('article',JSON.stringify(panier));
            })
        })        
    ).catch(err => console.log('Erreur : ' + err));
}
envoyerDonneesLs();


// const stockerDonnerLs = (choixTeddie) => {
//     let articleAjouter = localStorage.getItem('article');
//     if(articleAjouter) {
//         panier = JSON.parse(articleAjouter);
//         panier.push(choixTeddie);
//         localStorage.setItem('article',JSON.stringify(panier));
//     } else {
//         panier = [];
//         panier.push(choixTeddie);
//         localStorage.setItem('article',JSON.stringify(panier));
//     }
// }



// //Affiche l'image de l'article selectionné
// const afficheImage = (data) => {
//     let image = `<img class="selectProd_box_card_figure--img" src="${data.imageUrl}" alt="image teddies">`;
//     document.querySelector(".imgProd").innerHTML = image;
//     }

// // Affichage de la description de l'article selectionné
// const afficheDescriptionArticle = (data) => {
//     // Affichage de la description
//     let info = '<div>';
//     info += `<h3>Nom : ${data.name}</h3>`;
//     info += '<h4>Description :</h4>';
//     info += `<p>${data.description}`;
//     info += `<h5 class="btn btn-dark">Prix : ${data.price} €</h5>`;
//     info += '</div>';
//     document.querySelector(".detailsProd").innerHTML = info;
//     }

// // Affiche les option de personnalisation de couleur
// const optionClouleur = (data) => {
//     const optCouleur = document.querySelector("#color");
//     for(couleur of data.colors){
//         optCouleur.innerHTML += `<option value="${couleur}">${couleur}</option>`;
//     }
// }

// // Execute les 3 fonctions d'affichage
// const executeFonctionArticle = (infoProduit) => {
//     afficheImage(infoProduit);
//     afficheDescriptionArticle(infoProduit)
//     optionClouleur(infoProduit);
// }



// class Article {
//     constructor(id, name, price, description, imageUrl, colors) {
//         this.id = id;
//         this.name = name;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this.colors = colors;
//     }
// }
// recupereDonneeArticle(idRecuperer)
// .then((response) => {
//     Article = new Article(data._id, data.name, data.price, data.description, data.imageUrl, data.colors);
//     console.log(data);
//     executeFonctionArticle(Article);
// })