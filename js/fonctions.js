// Sauvegarder un article dans localStorage
let sauvegarderArticle = () =>{
    localStorage.setItem('article',JSON.stringify(mesArticles));
}

// Charger le panier
let chargerPanier = () =>{
    mesArticles = JSON.parse(localStorage.getItem('article'));
}
if(localStorage.getItem('article') != null){
chargerPanier();
}

// Ajouter dans panier
    // for(let article in mesArticles){
    //     if(article.id && article.couleur){
    //         article.quantite ++;
    //         sauvegarderArticle();
    //     }
    // }
    // mesArticles = [];
    // mesArticles.push(articleChoisie);
    // sauvegarderArticle();

// Bouton incrémenter article
const bntIncrementerQuantiter = (id, couleur) =>{
    for(article of mesArticles){
        if(article.id === id && article.couleur === couleur){
            article.quantite ++;
        }
    }
    sauvegarderArticle();
    location.reload();
}

// Bouton décrementer compteur article
const bntDecrementerQuantiter = (id, couleur) =>{
    for(article of mesArticles){
        if(article.id === id && article.couleur === couleur){
            article.quantite --;
        }
    }
    sauvegarderArticle();
    location.reload();
}

//Total panier
let prixtotalPanier = 0;
mesArticles.forEach((value) => {
    prixtotalPanier += (value.quantite * value.prix); 
});
let totalArticle = document.querySelector("#TotalPanier");
totalArticle.innerHTML = "Total de votre panier : " + (prixtotalPanier.toFixed(2)) + " €";

// Bouton Supprimer un article du panier
const btnSupprimerArticlePanier = (id) => {
    for(article of mesArticles){
        if(article.id === id){
            mesArticles.splice(article, 1);
        }
    }
    sauvegarderArticle();
    location.reload();
}

// Bouton Supprimer le panier
let supprimerPanier = document.querySelector('.suppPanier');
    supprimerPanier.addEventListener('click', (event)=>{
        localStorage.clear();
        location.reload();
    })

