let products = [];
// console.log(products);
const afficherMonpanier = () => {
    if(localStorage.getItem('article') != null) {
        chargerPanier();
        // console.log(mesArticles);
        for(article of mesArticles){
            products.push(article.id);
            let affichagerPanier = document.querySelector('#articlePanier');
            let indexArticle = mesArticles.indexOf(article);
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
                        <button class="btn btn-danger" onclick="btnSupprimerArticlePanier('${indexArticle}')">Supprimer</button>
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
boutonValidation.addEventListener("click", (event) => {
    if(formulaireCommande.checkValidity()){
        event.preventDefault();
        const contact = {
        firstName : document.getElementById("form_prenom").value,
        lastName : document.getElementById("form_nom").value,
        address : document.getElementById("form_address").value,
        city : document.getElementById("form_ville").value,
        email : document.getElementById("form_email").value,
        }
        console.log(products, contact);

        fetch('http://localhost:3000/api/teddies/order', { 
            method: 'post',
            headers: { 
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({products, contact})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            sessionStorage.setItem('order', JSON.stringify(data));
            window.location = "./commande.html";
        })
        .catch(err => console.log('Erreur : ' + err));
    }
})
