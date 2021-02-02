// recuperation de la reponse de confirmation et du prix total de la commande 
let commandeValider = JSON.parse(sessionStorage.getItem('order'));
console.log(commandeValider);


let commandeValiderText = document.querySelector("#commandeValider");
commandeValiderText.innerHTML = `<h3>Votre numéro de commande : ${commandeValider.orderId}</h3>`

let totalCommande = 0;
for(article of mesArticles){
    totalCommande += (article.prix / 200) * article.quantite;
}

let texteTotalCommande = document.querySelector("#totalCommande");
texteTotalCommande.innerHTML = `<h4>Le total de votre commande est de : ${totalCommande} €</h4>
                                <p>A bientôt chez Orinico</p>`




localStorage.clear();
