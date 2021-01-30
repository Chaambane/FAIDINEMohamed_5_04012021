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
                    <td><strong>Prix(unité) : </strong>${article.prix} €</td>
                    <td><strong>Couleur : </strong>${article.couleur}</td>
                    <td>
                        <div class="input-group">
                            <button class="btnMoinsArticle input-group-addon btn btn-primary" onclick="bntDecrementerQuantiter('${article.id}')">-</button>
                            <input type="number" class="item-count form-control text-center" value="${article.quantite}">
                            <button class="btnPlusArticle input-group-addon btn btn-primary" onclick="bntIncrementerQuantiter('${article.id}')">+</button>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="btnSupprimerArticlePanier('${article.id}')">Supprimer</button>
                    </td>
                    <td>Quantité : ${article.quantite}</td>
                </tr>
                </table>
                <div class="cart-footer">
                    <span>Total de votre article : ${((article.prix) * article.quantite).toFixed(2)} €</span>
                </div>
            </div>`;
        }
    } else {
        divAffichagePanier.innerHTML = '<p><strong>VOTRE PANIER EST VIDE !</strong></p>'
    }
}
afficherMonpanier();




// FORMULAIRE d'envoie
if (document.getElementById("btnValiderForm")) {
    document.getElementById("btnValiderForm").addEventListener("click", function () {
      let Formulaire_Invalide = "";
      let prenom = document.getElementById("prenom").value;
      let nom = document.getElementById("nom").value;
      let address = document.getElementById("address").value;
      let ville = document.getElementById("ville").value;
      let email = document.getElementById("email").value;
      if(formulaire.checkValidity()){
        let contact = {
          lastName: prenom,
          firstName: nom,
          address: address,
          city: ville,
          email: email,
      }
        let donneeAEnvoyer = { contact, idArticles};
        donneeAEnvoyer = JSON.stringify(donneeAEnvoyer);
        fetch("http://localhost:3000/api/teddies", { 
            method: "post",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: donneeAEnvoyer 
        })
          .then(response => response.json())
          .then(data => {
              console.log(data);
              sessionStorage.setItem('commande', JSON.stringify(data));
              console.log(sessionStorage);
              document.location.href = "/commande.html"
          })
          /* Sinon log les erreurs dans la console */
          .catch(err => console.log('Erreur : ' + err));
      }
    });
  }
