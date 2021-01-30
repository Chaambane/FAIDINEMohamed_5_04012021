const UrlApi = "http://localhost:3000/api/teddies";
//Récupération des données dans l'API
async function recupereDonneesApi () {
    await fetch(UrlApi)
    .then((response) =>
        response.json()
    .then(data => 
        afficherArticles(data))
    ).catch(err => console.log('Erreur : ' + err));
}

recupereDonneesApi();

const afficherArticles = (data) => {
    // console.log(data);
    let affichage = "";
    for(let teddie of data){
        affichage += 
        `<div class="col-6 col-sm-4 col-md-3 p-2 borderTeddies">
                <div class="card">
                    <img class="card-img-top" src="${teddie.imageUrl}" style="width: 100%;" alt="image article">
                <div class="card-body">
                    <h4 class="card-title"><strong>${teddie.name}</strong></h4>
                    <a href="produitDetail.html?id=${teddie._id}" class="btn btn-info">
                    <p class="card-text">${teddie.description}</p>
                    <p class="btn btn-dark">${teddie.price} €<span></p>
                    </a>
                </div>
            </div>
        </div>`
    }
    document.querySelector('#card_teddies').innerHTML = affichage;
}
