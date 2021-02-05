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
    event.preventDefault();
    let formContactInvalide = "";
    let firstName = document.querySelector("#form_prenom").value;
    let lastName = document.querySelector("#form_nom").value;
    let address = document.querySelector("#form_address").value;
    let city = document.querySelector("#form_ville").value;
    let email = document.querySelector("#form_email").value;

    if (/^[0-9 -]+$/.test(firstName))
        formContactInvalide += "Prénom  \n";
    if (/^[0-9 -]+$/.test(lastName))
        formContactInvalide += "Nom  \n";
    if (!address)
        formContactInvalide += "Adresse  \n";
    if (/[0-9]/.test(city) || !city)
        formContactInvalide += "Ville  \n";
    if (!/@/.test(email) || !email)
        formContactInvalide += "Email  \n";
    if(formContactInvalide)
        alert("Formulaire Invalide : Veuillez renseigner les champs mentionnés: \n" + formContactInvalide);
    else {
        let contact = {
            firstName : firstName,
            lastName : lastName,
            address : address,
            city : city,
            email : email,
        };

        fetch('http://localhost:3000/api/teddies/order', { 
            method: 'post',
            headers: { 
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({products, contact})
        })
        .then((response) => {
            /* Si connection ok ajout orderId au local storage */
            if (response.ok) {
              response.json()
            .then((data) => {
                console.log(data);
                sessionStorage.setItem('order', JSON.stringify(data));
            });
            window.location = "./commande.html";
            } else {
                Promise.reject(response.status);
            }
        }).catch(err => console.log('Erreur : ' + err));
    }
})
