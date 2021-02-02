let idArticles = [];

const afficherMonpanier = () => {
    if(localStorage.getItem('article') != null) {
        chargerPanier();
        // console.log(mesArticles);
        for(article of mesArticles){
            idArticles.push(article.id);
            let affichagerPanier = document.querySelector('#articlePanier');
            // console.log(idArticle);
            affichagerPanier.innerHTML += 
            `<div class="card m-1">
                <table class="table">
                <tr>
                    <td><strong>Nom : </strong>${article.nom}</td>
                    <td><strong>Prix(unité) : </strong>${article.prix / 200} €</td>
                    <td><strong>Couleur : </strong>${article.couleur}</td>
                    <td>
                        <div class="input-group">
                            <button class="btnMoinsArticle input-group-addon btn btn-primary" onclick="bntDecrementerQuantiter('${article.id}', '${article.couleur}')">-</button>
                            <input type="number" class="item-count form-control text-center" value="${article.quantite}">
                            <button class="btnPlusArticle input-group-addon btn btn-primary" onclick="bntIncrementerQuantiter('${article.id}', '${article.couleur}')">+</button>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="btnSupprimerArticlePanier('${article.id}')">Supprimer</button>
                    </td>
                    <td>Quantité : ${article.quantite}</td>
                </tr>
                </table>
                <div class="cart-footer">
                    <span>Total de votre article : ${((article.prix / 200) * article.quantite).toFixed(2)} €</span>
                </div>
            </div>`;
        }
        totalPanier();
    }
}
afficherMonpanier();




// FORMULAIRE d'envoie
let boutonValidation = document.querySelector("#btnValiderForm");
let formulaireCommande = document.querySelector("#formulaireCommande");
if (boutonValidation) {
    boutonValidation.addEventListener("click", (event) => {
        if(formulaireCommande.checkValidity()){
            event.preventDefault();
            let contact = {
            firstName : document.getElementById("form_prenom").value,
            lastName : document.getElementById("form_nom").value,
            adresse : document.getElementById("form_address").value,
            city : document.getElementById("form_ville").value,
            email : document.getElementById("form_email").value
            }
            let order = { contact, idArticles};
            order = JSON.stringify(order);
        
            fetch("http://localhost:3000/api/teddies/order", { 
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: order 
            })
            .then((response) => 
                response.json() 
            .then(data => {
                    console.log(data);
                    localStorage.setItem('order', JSON.stringify(data))
                    console.log(localStorage);
                    window.location = "./commande.html"
                })
            ).catch(err => console.log('Erreur : ' + err));
        }
    })
}
