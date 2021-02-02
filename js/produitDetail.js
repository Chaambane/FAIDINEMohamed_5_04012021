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
        console.log(data);
        afficherUnArticle(data);
    })        
).catch(err => console.log('Erreur : ' + err));
}

telechargeData();


                // LES FONCTIONS

const boxTeddie = document.querySelector('.box_detail');
const afficherUnArticle = (data) => {
    let articleChoisie = document.createElement("div");
    articleChoisie.innerHTML =
    `<div class="card text-center col-lg-8" > 
            <div class="card-header">
                <h2> ${data.name}</h2>
                <p> ${data.price } € </p> 
            </div>
            <div class="card-body">
                <img class="card-img-top" src="${data.imageUrl}" alt="">
                <p class="card-text">${data.description} </p> 
            </div>
            <div class="card-footer text-dark">
                <form>
                <div class="form-group">
                        <label><strong>Quantité : </strong></label>
                        <input class="text-center rounded" id="quantite" type="number" min="1" value="1"/> 
                    </div>
                    <div class="form-group text-center">
                        <label>Choisissez une couleur </label>
                        <select class="form-control" id="choixCouleur"></select> 
                    </div>
                </form>
            </div>
        </div>`;
 boxTeddie.appendChild(articleChoisie);
 couleurArticle(data);
}

// LocalStorage

const validerArticle = document.querySelector(".btnAjouterPanier");

async function sauvegarderDansLocalStorage(){
        await fetch(url)
    .then((response) => 
            response.json()
    .then((data) => {
        // console.log(data);
            validerArticle.addEventListener('click', () => {
                let articleChoisie  =  {
                    id : data._id,
                    nom : data.name ,
                    prix : data.price,
                    image : data.imageUrl,
                    couleur : document.querySelector('#choixCouleur').value,
                    quantite : document.querySelector('#quantite').value,
                }
                let ajouterArticle = localStorage.getItem('article');
                
                if(ajouterArticle){
                    mesArticles = JSON.parse(ajouterArticle);
                    mesArticles.push(articleChoisie);
                    sauvegarderArticle();
                } else{
                    mesArticles = [];
                    mesArticles.push(articleChoisie);
                    sauvegarderArticle();
                }
              });
        })        
    ).catch(err => console.log('Erreur : ' + err));
}
sauvegarderDansLocalStorage();

