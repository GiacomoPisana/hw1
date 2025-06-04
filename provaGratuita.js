let premiumLeave = false;
let dynamicPremiumLeave = false;

function functionPremiumMouseEnter(event) {
    element = document.querySelector('.dynamicPremium');
    element.classList.add('dynamicPremiumYes');
}

function nascondiDynamicPremium(){
    if (premiumLeave && dynamicPremiumLeave){
        element = document.querySelector('.dynamicPremium');
        element.classList.remove('dynamicPremiumYes');
        premiumLeave = false;
        dynamicPremiumLeave = false;
    }
}

function functionPremiumMouseLeave(event) {
    premiumLeave = true;
    nascondiDynamicPremium();
}

function functionDynamicPremiumMouseLeave(event){
    dynamicPremiumLeave = true;
    nascondiDynamicPremium();
}

function onJsonAlbum(json){
    const libreria = document.querySelector('#Album-view');
    libreria.innerHTML = '';
    const risultati = json.albums.items;
    let nRisultati = risultati.length;

    if (nRisultati > 16)
        nRisultati = 16;

    for(let i=0; i<nRisultati; i++){
        const datiAlbum = risultati[i];
        const titolo = datiAlbum.name;
        const immagineSelezionata = datiAlbum.images[0].url;
        const numTracce = datiAlbum.total_tracks;
        const dataRilascio = datiAlbum.release_date;

        const album = document.createElement('div');
        album.classList.add('album');
        const img = document.createElement('img');
        img.src = immagineSelezionata;
        const didascalia = document.createElement('div');
        const didTitolo = document.createElement('span');
        didTitolo.textContent = "Album: "+ titolo;
        const didNumTracce = document.createElement('span');
        didNumTracce.textContent = "Numero di tracce: " + numTracce;
        const didDataRilascio = document.createElement('span');
        didDataRilascio.textContent = "Data di rilascio: " + dataRilascio;
        didascalia.appendChild(didTitolo);
        didascalia.appendChild(didNumTracce);
        didascalia.appendChild(didDataRilascio);
        didascalia.classList.add('didascaliaAlbum');
        album.appendChild(img);
        album.appendChild(didascalia);
        libreria.appendChild(album);

        console.log(datiAlbum);
    }
}

function onResponseAlbum(response){
    return response.json();
}

function onJsonBrano(json){
    const libreria = document.querySelector('#Brano-view');
    libreria.innerHTML = '';

    const risultati = json.tracks.items;
    let nRisultati = risultati.length

    if (nRisultati > 4)
        nRisultati = 4;

    for(let i=0; i<nRisultati; i++){
        const datiBrano = risultati[i];
        const titolo = datiBrano.name;
        const immagineSelezionata = datiBrano.album.images[0].url;
        const artista = datiBrano.artists[0].name;
        const durata = datiBrano.duration_ms;

        const brano = document.createElement('div');
        brano.classList.add('brano');
        const img = document.createElement('img');
        img.src = immagineSelezionata;
        const didascalia = document.createElement('div');
        const didTitolo = document.createElement('span');
        didTitolo.textContent = "Brano: "+ titolo;
        didNomeArtista = document.createElement('span');
        didNomeArtista.textContent = "Artista: " + artista;
        const didDurata = document.createElement('span');
        const minuti = Math.floor(durata / 60000);
        const secondi = Math.floor((durata % 60000) / 1000);
        didDurata.textContent = "Durata: " + minuti + ":" + (secondi < 10 ? '0' : '') + secondi;

        didascalia.appendChild(didTitolo);
        didascalia.appendChild(didNomeArtista);
        didascalia.appendChild(didDurata);
        didascalia.classList.add('didascaliaBrano');

        brano.appendChild(img);
        brano.appendChild(didascalia);
        libreria.appendChild(brano);
    }
    console.log(datiBrano);
}

function onJsonArtist(json){
    const libreria = document.querySelector('#Artista-view');
    libreria.innerHTML = '';
    const risultati = json.artists.items;

    const datiArtista = risultati[0];
    console.log(datiArtista);

    const nomeArtista = datiArtista.name;
    const immagineSelezionata = datiArtista.images[0].url;
    const numFollower = datiArtista.followers.total;
    const genere = datiArtista.genres[0];

    const artista = document.createElement('div');
    artista.classList.add('artista');
    const img = document.createElement('img');
    img.src = immagineSelezionata;
    const didascalia = document.createElement('div');
    const didNomeArtista = document.createElement('span');
    didNomeArtista.textContent = "Artista: "+ nomeArtista;
    const didGenere = document.createElement('span');
    didGenere.textContent = "Genere: " + genere;
    const didNumFollower = document.createElement('span');
    didNumFollower.textContent = "Numero di follower: " + numFollower; 

    didascalia.appendChild(didNomeArtista);
    didascalia.appendChild(didGenere);
    didascalia.appendChild(didNumFollower);
    didascalia.classList.add('didascaliaArtista');
    artista.appendChild(img);
    artista.appendChild(didascalia);
    libreria.appendChild(artista);

}

function onResponseBrano(response){
    return response.json();
}

function onResponseArtist(response){
    return response.json();
}


function barraRicercaF(event){
    event.preventDefault();

    const input = document.querySelector('#Ricerca-flex-container-box-Barra-testo-input');
    const value = encodeURIComponent(input.value);

    const menu = document.querySelector('#Ricerca-flex-container-box-Barra-testo-select');
    const scelta = menu.value;
    if (scelta == "album"){
        fetch("https://api.spotify.com/v1/search?type=album&q=" + value,
            {
              headers:
              {
                'Authorization': 'Bearer ' + token
              }
            }
          ).then(onResponseAlbum).then(onJsonAlbum);
    }

    else if (scelta == "brano"){
        fetch("https://api.spotify.com/v1/search?type=track&q=" + value,
            {
              headers:
              {
                'Authorization': 'Bearer ' + token
              }
            }
          ).then(onResponseBrano).then(onJsonBrano);
    }

    else if (scelta == "artista"){
        fetch("https://api.spotify.com/v1/search?type=artist&q=" + value,
            {
                headers:
                {
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(onResponseArtist).then(onJsonArtist);
    }

}

function barraRicercaFMobile(event){
    event.preventDefault();

    const input = document.querySelector('#Ricerca-flex-container-box-Barra-testo-input_mobile');
    const value = encodeURIComponent(input.value);

    const menu = document.querySelector('#Ricerca-flex-container-box-Barra-testo-select_mobile');
    const scelta = menu.value;
    if (scelta == "album"){
        fetch("https://api.spotify.com/v1/search?type=album&q=" + value,
            {
              headers:
              {
                'Authorization': 'Bearer ' + token
              }
            }
          ).then(onResponseAlbum).then(onJsonAlbum);
    }

    else if (scelta == "brano"){
        fetch("https://api.spotify.com/v1/search?type=track&q=" + value,
            {
              headers:
              {
                'Authorization': 'Bearer ' + token
              }
            }
          ).then(onResponseBrano).then(onJsonBrano);
    }

    else if (scelta == "artista"){
        fetch("https://api.spotify.com/v1/search?type=artist&q=" + value,
            {
                headers:
                {
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(onResponseArtist).then(onJsonArtist);
    }

}

function onTokenJson(json)
{
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}






function generaClassificaGlobal(event){
    event.preventDefault();
}

function generaClassificaGlobal1(event){
    event.preventDefault();
}

const premium = document.querySelector('#header-items-navbar-flex-Premium');
premium.addEventListener('mouseenter', functionPremiumMouseEnter);
premium.addEventListener('mouseleave', functionPremiumMouseLeave);
const dynamicPremium = document.querySelector('.dynamicPremium');
dynamicPremium.addEventListener('mouseleave', functionDynamicPremiumMouseLeave);


const client_id = 'd6aacf8c8a1b4ab2be4a344032115de1'; 
const client_secret = '149a750bdbfa4aca89cc0c504465b9b9'; 

let token;

fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

const barraRicerca = document.querySelector('#Ricerca-flex-container-box-Barra');
barraRicerca.addEventListener('submit', barraRicercaF);

const barraRicercaMobile = document.querySelector('#Ricerca-flex-container-box-Barra-mobile');
barraRicercaMobile.addEventListener('submit', barraRicercaFMobile);

const classificaGlobal = document.querySelector('#Classifiche-flex-container-box');
classificaGlobal.addEventListener('submit', generaClassificaGlobal);

const classificaGlobal1 = document.querySelector('#Classifiche-flex-container-box_1');
classificaGlobal1.addEventListener('submit', generaClassificaGlobal1); 