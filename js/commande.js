// recuperation de la reponse de confirmation et du prix total de la commande 
let commandeValider = sessionStorage.order;
let donneeCommande = commandeValider && JSON.parse(commandeValider);
console.log(donneeCommande);


let commandeValiderText = document.querySelector("#commandeValider");
commandeValiderText.innerHTML = `Merci ${donneeCommande.contact.firstName} pour avoir fait vos achats sur Orinico.com`;




localStorage.clear();
