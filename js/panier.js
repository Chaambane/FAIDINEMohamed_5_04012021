const divAffichagePanier = document.querySelector('#affichagePanier');
const PrixTotal = document.querySelector("#TotalPanier");
const totalCommande = document.querySelector('#TotalPanier');
let mesArticles = JSON.parse(localStorage.getItem('article'));

const afficherMonpanier = () => {
    if(mesArticles === null) {
        divAffichagePanier.innerHTML = 'Votre panier est vide !'
    } else {
        // console.log(mesArticles);
        
        let listeArticles = "";
        for(let article of mesArticles){
            listeArticles += 
            `<div id="${article.Id}" class="row mb-4">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <img class="img-fluid img-thumbnail h-40" src="${article.Image}">
                </div>
                <div>
                    <div class="d-flex justify-content-between">
                        <div>
                            <p><strong>${article.Nom}</strong></p>
                            <p class="mb-2 text-muted text-uppercase small">Color: ${article.Couleur}</p>
                            </div>
                            <div>
                            <div class="mb-0 w-100">
                                <p>Quantité : ${article.Nombre}</p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3"> Supprimer article </a>
                        <p class="mb-0"><em>Prix : ${article.Prix} €</em></p>
                        </div>
                        <div>
                        <p class="mb-0"><strong>Total : ${((article.Prix) * article.Nombre).toFixed(2)} €</strong></p>
                        </div>
                    </div>
                </div>
            </div>
                <hr class="mb-4">`
        }
        // console.log(mesArticles);
        divAffichagePanier.innerHTML = listeArticles;
    }
}
afficherMonpanier();

const PrixTotalPanier = () =>{
    let qteArticleDansPanier = [];
    let tabPrixTotal =[];
    for(let articleLs of mesArticles){
        tedQuantité = articleLs.Nombre;
        qteArticleDansPanier.push(tedQuantité);
        console.log(qteArticleDansPanier);

        tedPrix = articleLs.Prix;
        tabPrixTotal.push(tedPrix);
    }
    if(qteArticleDansPanier){
        let prixTotal = tabPrixTotal.reduce((accumulator, currentValue) => accumulator + currentValue);
        totalCommande.innerHTML = `TOTAl : ${prixTotal}`;
        localStorage.setItem("PrixTotal", prixTotal);
    }
}
PrixTotalPanier();


// ${(article.Prix * article.Nombre).toFixed(2)}
// Premier test


// `<div class="card">
//     <img src="${article.Image}" />
//     <div class="card-title text-center">
//     <h2>${article.Nom}</h2>
//     <p class="text-center">${article.Couleur}</p>
//     <p>Prix de l'article : ${article.Prix}</p>
//     <p>Quantité : ${article.Nombre}</p>
// </div>`