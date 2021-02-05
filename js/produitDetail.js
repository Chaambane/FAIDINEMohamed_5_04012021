// Récuperation de l'id dans l'url
const recupereIdUrl = () => {
    let params = (new URL(document.location)).searchParams;
    let teddiesId = params.get('id');
    return teddiesId;
}
const url = "http://localhost:3000/api/teddies/" + recupereIdUrl();

// Recupere données de l'id récupérer
async function telechargeData(){
     await fetch(url)
    .then((response) => 
            response.json()
    .then((data) => {
        // console.log(data);
        const boxTeddie = document.querySelector('.box_detail');
            let articleChoisie = document.createElement("div");
            articleChoisie.innerHTML =
            `<div class="card text-center col-lg-8" > 
                    <div class="card-header">
                        <h2> ${data.name}</h2>
                        <p> ${data.price / 100} € </p> 
                    </div>
                    <div class="card-body">
                        <img class="card-img-top" src="${data.imageUrl}" alt="">
                        <p class="card-text">${data.description} </p> 
                    </div>
                    <div class="card-footer text-dark">
                        <form>
                            <div class="form-group text-center">
                                <label for="choixCouleur">Choisissez une couleur </label>
                                <select class="form-control" id="choixCouleur"></select> 
                            </div>
                        </form>
                    </div>
                </div>`;
        boxTeddie.appendChild(articleChoisie);

        const maCouleur = document.querySelector('#choixCouleur');
        for(let couleurChoisie of data.colors){
            maCouleur.innerHTML += '<option value="' + couleurChoisie + '">' + couleurChoisie + '</option>';
        }

        const validerArticle = document.querySelector(".btnAjouterPanier");
        validerArticle.addEventListener('click', () => {
            ajouterArticleDansPanier();
          });

          // On regarde si localStorage existe on parse les donné sinon on retourne un tableau vide.
            const paramPanier = () => {
                let ajouterArticle = localStorage.getItem('article');
                if(ajouterArticle === null){
                    return [];
                } else {
                    return JSON.parse(ajouterArticle);
                }
            }


            const ajouterArticleDansPanier = () => {        
            let mesArticles = paramPanier();
            let estDansPanier = false; 
        
            for(article of mesArticles){
                if(article.id == data._id && article.couleur == maCouleur.value){
                    article.quantite ++;
                    estDansPanier = true; // On confirme que l'article éxiste bien dans le localstorage.
                    break;
                }
            };
            if(!estDansPanier){ // Si estDansPanier = false, alors il faut créer un nouveau article car il n'éxiste pas.
                mesArticles.push({
                    id : data._id,
                    nom : data.name ,
                    prix : data.price,
                    image : data.imageUrl,
                    couleur : maCouleur.value,
                    quantite : 1
                });
            }
            localStorage.setItem('article',JSON.stringify(mesArticles));
        };

    })        
).catch(err => console.log('Erreur : ' + err));
}

telechargeData();



