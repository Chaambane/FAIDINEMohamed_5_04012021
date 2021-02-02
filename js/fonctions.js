// PRODUIT DETAIL

// Nombre d'article qu'on souhaite
const selectionneQuantité = () => {
    let quantiteArticle = document.querySelector('#quantite')
    for(let i = 1; i <= 10; i++){ 
        quantiteArticle.innerText += i;
        quantiteArticle.append(choixQuantité);
    }
};

// Choix de la couleur du nounours
const couleurArticle = (data) => {
    let couleur = document.querySelector('#choixCouleur')
    for(let i = 0; i < data.colors.length; i++){
        let couleurChoisie = document.createElement("option");
        couleurChoisie.innerText = data.colors[i];
        couleur.append(couleurChoisie);
    }
};

const btnAllerPanier = document.querySelector(".btnPagePanier");
if(btnAllerPanier){
    btnAllerPanier.addEventListener('click',()=>{
        document.location.href = './panier.html';
});
}

// PANIER

// Sauvegarder un article dans localStorage
let sauvegarderArticle = () =>{
    localStorage.setItem('article',JSON.stringify(mesArticles));
};

// Charger le panier
let chargerPanier = () =>{
    mesArticles = JSON.parse(localStorage.getItem('article'));
}
if(localStorage.getItem('article') != null){
chargerPanier();
};

// Bouton incrémenter article
const bntIncrementerQuantiter = (id, couleur) =>{
    for(article of mesArticles){
        if(article.id === id && article.couleur === couleur){
            article.quantite ++;
        }
    }
    sauvegarderArticle();
    location.reload();
};

// Bouton décrementer compteur article
const bntDecrementerQuantiter = (id, couleur) =>{
    for(article of mesArticles){
        if(article.id === id && article.couleur === couleur){
            article.quantite --;
        }
    }
    sauvegarderArticle();
    location.reload();
};

//Total panier
const totalPanier = () => {
    let totalCommande = 0;
    for(article of mesArticles){
        totalCommande += (article.prix / 200) * article.quantite;
    }
    let totalArticle = document.querySelector("#TotalPanier");
    if(totalArticle){
        return totalArticle.innerHTML = "Total de votre Commande : " +  totalCommande.toFixed(2) + " € ";
    }
};


// Bouton Supprimer un article du panier
const btnSupprimerArticlePanier = (index) => {
    mesArticles.splice(index, 1);
    sauvegarderArticle();
    location.reload();
};

// Bouton Supprimer le panier
let supprimerPanier = document.querySelector('.suppPanier');
if(supprimerPanier){
    supprimerPanier.addEventListener('click', (event)=>{
        localStorage.clear();
    });
}


const continuerAchat = document.querySelector(".btnContinuerAchat");
if(continuerAchat){
    continuerAchat.addEventListener('click',()=>{
        document.location.href = './index.html';
    })
}
