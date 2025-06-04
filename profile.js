function onResponse(response){
    return response.json();
}



let click = false;
function iconF(event){
    event.preventDefault();
    let libreria = document.querySelector('.generateMenujs');
    libreria.innerHTML = "";
    
    if (!click){
        libreria.classList.remove('hidden');
        let container = document.createElement('div');
        container.classList.add('menuTendinaContainer');
        let home = document.createElement('a');
        home.textContent = "Home";
        home.href = "home_page.php";
        let logout = document.createElement('a');
        logout.textContent = "Logout";
        logout.href = "logout.php";
        
        home.classList.add('menuTendina');
        logout.classList.add('menuTendina');
        container.appendChild(home);
        container.appendChild(logout);
        libreria.appendChild(container);
        click = true;
    } else {
        libreria.classList.add('hidden');
        home = null;
        logout = null;
        container = null;
        libreria = null;
        click = false;
        
    }
    
}

function modifyNumArtistiSeguiti(numArtistiSeguiti){
    const header = document.querySelector('#destra-header-utente a');
    const libreria = document.querySelector('#numArtistiSeguiti');
    
    if (numArtistiSeguiti == 0)
        libreria.textContent = "Nessun artista seguito";
    else if (numArtistiSeguiti == 1){
        header.textContent = numArtistiSeguiti + " seguito";
        libreria.textContent = numArtistiSeguiti + " seguito";
    }
    else {
        header.textContent = numArtistiSeguiti + " seguiti";
        libreria.textContent = numArtistiSeguiti + " seguiti";
    }

    header.addEventListener('click', artistiSeguitiF);

}

function onJsonArtistiTopMese(json){
    const libreria = document.querySelector('#ArtistiTopMese');
    const risultati = json;

    console.log(risultati);
    const nRisultati = risultati.length;

    modifyNumArtistiSeguiti(nRisultati);

    if (nRisultati === 0)
        return;

    const header = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.textContent = "Gli artisti top di questo mese";
    const h2 = document.createElement('h2');
    h2.textContent = "Visibile solo a te";

    libreria.classList.add('ArtistiTopMese');
    header.classList.add('headerArtistiTopMese');
    h1.classList.add('h1');
    h2.classList.add('h2');
    
    header.appendChild(h1);
    header.appendChild(h2);
    libreria.appendChild(header);

    if (nRisultati > 4)
        nRisultati = 4;
    
    const artistaView = document.createElement('div');
    artistaView.classList.add('Artista-view')
    artistaView.innerHTML = "";

    for(let i = 0; i < nRisultati; i++){
        const datiArtista = risultati[i];
        const name = datiArtista.NAME;
        
        const image = datiArtista.Image;

        const artista = document.createElement('div');
        artista.classList.add('artista');
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('img');
        const didascalia = document.createElement('div');
        const didName = document.createElement('span');
        didName.textContent = name;
        didName.classList.add('name');
        const didArtista = document.createElement('span');
        didArtista.textContent = "Artista";
        didArtista.classList.add('didArtista');

        didascalia.appendChild(didName);
        didascalia.appendChild(didArtista);
        didascalia.classList.add('didascaliaArtista')
        artista.appendChild(img);
        artista.appendChild(didascalia);

        artistaView.appendChild(artista);
    }

    libreria.appendChild(artistaView);
}

function modifyNumBraniPiaciuti(numBraniPiaciuti){
    const braniPiaciuti = document.querySelector('#numBraniPiaciuti');
    if (numBraniPiaciuti == 0)
        braniPiaciuti.textContent = "Nessun brano piaciuto";
    else if (numBraniPiaciuti == 1)
        braniPiaciuti.textContent = "Playlist " + numBraniPiaciuti + " brano";
    else 
        braniPiaciuti.textContent = "Playlist " + numBraniPiaciuti + " brani";
}


function onJsonBraniTopMese(json){
    const libreria = document.querySelector('#BraniTopMese');
    const risultati = json;

    console.log(risultati);
    let nRisultati = risultati.length;

    if (nRisultati === 0)
        return;

    const header = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.textContent = "I brani preferiti di questo mese";
    const h2 = document.createElement('h2');
    h2.textContent = "Visibile solo a te";

    libreria.classList.add('BraniTopMese');
    header.classList.add('headerBraniTopMese');
    h1.classList.add('h1');
    h2.classList.add('h2');
    
    header.appendChild(h1);
    header.appendChild(h2);
    libreria.appendChild(header);
    
    modifyNumBraniPiaciuti(nRisultati);
    if (nRisultati > 4)
        nRisultati = 4;
    
    const BranoView = document.createElement('div');
    BranoView.classList.add('BranoView')
    BranoView.innerHTML = "";
    
    for(let i = 0; i < nRisultati; i++){
        const datiBrano = risultati[i];

        const titolo = datiBrano.Titolo;
        const image = datiBrano.Image;
        const durata = datiBrano.Durata;

        const brano = document.createElement('div');
        brano.classList.add('brano');

        const indice = document.createElement('div');
        indice.classList.add('indice');
        const value = document.createElement('p')
        value.textContent = i + 1;

        const img = document.createElement('img');
        img.src = image;
        img.classList.add('img');
        const didascalia = document.createElement('div');
        didascalia.classList.add('didascaliaBrano');
        const didascaliaTitArt = document.createElement('div');
        didascaliaTitArt.classList.add('didTitArt');
        const didTitolo = document.createElement('span');
        didTitolo.textContent = titolo;
        const didArt = document.createElement('span');
        didArt.textContent = datiBrano.artisti;
        didArt.classList.add('artistiStyle');

        const didDurata = document.createElement('span');
        const minuti = Math.floor(durata / 60000);
        const secondi = Math.floor((durata % 60000) / 1000);
        didDurata.textContent = + minuti + ":" + (secondi < 10 ? '0' : '') + secondi;
        

        indice.appendChild(value);
        brano.appendChild(indice);
        brano.appendChild(img);
        didascaliaTitArt.appendChild(didTitolo);
        didascaliaTitArt.appendChild(didArt);
        didascalia.appendChild(didascaliaTitArt);
        didascalia.appendChild(didDurata);
        brano.appendChild(didascalia);
        BranoView.appendChild(brano);

    }
    libreria.appendChild(BranoView);

}

function modifyNumAlbumSalvati(numAlbum){
    const numAlbumSpan = document.querySelector('#numAlbumSalvati');
    if (numAlbum == 0)
        numAlbumSpan.textContent = "Nessun album salvato";
    else if (numAlbum == 1)
        numAlbumSpan.textContent = "" + numAlbum + " salvato";
    else 
        numAlbumSpan.textContent = "" + numAlbum + " salvati";
}

function onJsonAlbumSalvati(json){
    const risultati = json;


    const nRisultati = risultati.length;

    modifyNumAlbumSalvati(nRisultati);
}

function artistiF(event){
    fetch("getArtistiSeguiti.php").then(onResponse).then(onJsonArtistiTopMese);
}

function braniF(event){
    fetch("recentLikeSong.php").then(onResponse).then(onJsonBraniTopMese);
}

function albumF(event){
    fetch("recentLikeAlbum.php").then(onResponse).then(onJsonAlbumSalvati);
}

function chiusuraView(libreria, chiusura, x_content){
    libreria.innerHTML = "";
    x_content.innerHTML = "";
    chiusura.removeChild(x_content);
    document.querySelector('.destra').classList.remove('hidden');
    document.querySelector('#LibreriaContainer-BraniPiaciuti').addEventListener('click', braniPiaciutiF);
}

function onJsonBraniPiaciuti(json){
    console.log("16.07");
    

    const risultati = json;
    const nRisultati = risultati.length;

    const libreria = document.querySelector('.BraniPiaciuti');
    const header = document.createElement('div');
    header.classList.add('headerBraniPiaciuti');
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('headerBraniPiaciuti-container');

    const svgContent = document.createElement('div');
    svgContent.innerHTML =   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="red">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                            2 6.01 4.01 4 6.5 4 
                            c1.74 0 3.41 1.01 4.13 2.44 
                            C11.09 5.01 12.76 4 14.5 4 
                            16.99 4 19 6.01 19 8.5 
                            c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>`;
    svgContent.classList.add('headerBraniPiaciuti-svg');
    
    const h3 = document.createElement('h3');
    h3.classList.add('h3');
    h3.textContent = "Playlist";
    
    const h1 = document.createElement('h1');
    h1.classList.add('h1');
    h1.textContent = "Brani che ti piacciono"; 

    const h2 = document.createElement('h2');
    h2.classList.add('h2');
    const link = document.createElement('a');
    link.href = "";
    link.classList.add('link');
    link.textContent = document.querySelector('#destra-header-utente h1').textContent;

    h2.appendChild(link);
    const textNode = document.createTextNode(nRisultati + " brani");
    h2.appendChild(textNode);
    headerContainer.appendChild(h3);
    headerContainer.appendChild(h1);
    headerContainer.appendChild(h2);

    header.appendChild(svgContent);
    header.appendChild(headerContainer);
    libreria.appendChild(header);

    const BranoView = document.createElement('div');
    BranoView.classList.add('BranoView');
    BranoView.classList.add('BranoViewPiaciuti');
    console.log("Ho aggiunto la scrollbar");
    BranoView.innerHTML = "";
    
    for(let i = 0; i < nRisultati; i++){
        const datiBrano = risultati[i];

        const titolo = datiBrano.Titolo;
        const image = datiBrano.Image;
        const durata = datiBrano.Durata;

        const brano = document.createElement('div');
        brano.classList.add('brano');

        const indice = document.createElement('div');
        indice.classList.add('indice');
        const value = document.createElement('p')
        value.textContent = i + 1;

        const img = document.createElement('img');
        img.src = image;
        img.classList.add('img');
        const didascalia = document.createElement('div');
        didascalia.classList.add('didascaliaBrano');
        const didascaliaTitArt = document.createElement('div');
        didascaliaTitArt.classList.add('didTitArt');
        const didTitolo = document.createElement('span');
        didTitolo.textContent = titolo;
        const didArt = document.createElement('span');
        didArt.textContent = datiBrano.artisti;
        didArt.classList.add('artistiStyle');

        const didDurata = document.createElement('span');
        const minuti = Math.floor(durata / 60000);
        const secondi = Math.floor((durata % 60000) / 1000);
        didDurata.textContent = + minuti + ":" + (secondi < 10 ? '0' : '') + secondi;
        

        indice.appendChild(value);
        brano.appendChild(indice);
        brano.appendChild(img);
        didascaliaTitArt.appendChild(didTitolo);
        didascaliaTitArt.appendChild(didArt);
        didascalia.appendChild(didascaliaTitArt);
        didascalia.appendChild(didDurata);
        brano.appendChild(didascalia);
        BranoView.appendChild(brano);

    }
    libreria.appendChild(BranoView);

    
}

function onJsonAlbumSalvatiView(json){

    const risultati = json;
    const nRisultati = risultati.length;

    const libreria = document.querySelector('.AlbumSalvati');
    //libreria.classList.add('AlbumSalvatiExists');
    const header = document.createElement('div');
    header.classList.add('headerAlbumSalvati');
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('headerAlbumSalvati-container');

    const svgContent = document.createElement('div');
    svgContent.innerHTML =  `                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4a2 2 0 0 0-2 2v16l8-5 8 5V6a2 2 0 0 0-2-2H6z"/>
                        </svg>`;
    svgContent.classList.add('headerAlbumSalvati-svg');
    
    const h3 = document.createElement('h3');
    h3.classList.add('h3');
    h3.textContent = "Playlist";
    
    const h1 = document.createElement('h1');
    h1.classList.add('h1');
    h1.textContent = "Album che hai salvato"; 

    const h2 = document.createElement('h2');
    h2.classList.add('h2');
    const link = document.createElement('a');
    link.href = "";
    link.classList.add('link');
    link.textContent = document.querySelector('#destra-header-utente h1').textContent;

    h2.appendChild(link);
    const textNode = document.createTextNode(nRisultati + " album");
    h2.appendChild(textNode);
    headerContainer.appendChild(h3);
    headerContainer.appendChild(h1);
    headerContainer.appendChild(h2);

    header.appendChild(svgContent);
    header.appendChild(headerContainer);
    libreria.appendChild(header);

    const albumView = document.createElement('div');
    albumView.classList.add('albumView');
    albumView.classList.add('albumViewSalvati');
    console.log("Ho aggiunto la scrollbar");
    albumView.innerHTML = "";
    
    for(let i = 0; i < nRisultati; i++){
        const datiAlbum = risultati[i];

        const titolo = datiAlbum.Titolo;
        const image = datiAlbum.Image;
        const numTracce = datiAlbum.NumeroTracce;

        const album = document.createElement('div');
        album.classList.add('album');

        const indice = document.createElement('div');
        indice.classList.add('indice');
        const value = document.createElement('p')
        value.textContent = i + 1;

        const img = document.createElement('img');
        img.src = image;
        img.classList.add('img');
        const didascalia = document.createElement('div');
        didascalia.classList.add('didascaliaAlbum');
        const didascaliaTitArt = document.createElement('div');
        didascaliaTitArt.classList.add('didTitArt');
        const didTitolo = document.createElement('span');
        didTitolo.textContent = titolo;
        const didArt = document.createElement('span');
        didArt.textContent = datiAlbum.artisti;
        didArt.classList.add('artistiStyle');

        const didNumTracce = document.createElement('span');
        didNumTracce.textContent = numTracce + " brani";
        

        indice.appendChild(value);
        album.appendChild(indice);
        album.appendChild(img);
        didascaliaTitArt.appendChild(didTitolo);
        didascaliaTitArt.appendChild(didArt);
        didascalia.appendChild(didascaliaTitArt);
        didascalia.appendChild(didNumTracce);
        album.appendChild(didascalia);
        albumView.appendChild(album);

    }
    libreria.appendChild(albumView);
    console.log("16.56");
}

function onJsonArtistiSeguiti(json){
    const risultati = json;
    const nRisultati = risultati.length;

    const libreria = document.querySelector('.ArtistiSeguiti');

    const header = document.createElement('div');
    header.classList.add('headerArtistiSeguiti');
    const h1 = document.createElement('h1');
    h1.textContent = "Segui già";

    header.appendChild(h1);
    libreria.appendChild(header);

    const artistaView = document.createElement('div');
    artistaView.classList.add('Artista-view')
    artistaView.innerHTML = "";

    for(let i = 0; i < nRisultati; i++){
        const datiArtista = risultati[i];
        const name = datiArtista.NAME;
        
        const image = datiArtista.Image;

        const artista = document.createElement('div');
        artista.classList.add('artista');
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('img');
        const didascalia = document.createElement('div');
        const didName = document.createElement('span');
        didName.textContent = name;
        didName.classList.add('name');
        const didArtista = document.createElement('span');
        didArtista.textContent = "Artista";
        didArtista.classList.add('didArtista');

        didascalia.appendChild(didName);
        didascalia.appendChild(didArtista);
        didascalia.classList.add('didascaliaArtista')
        artista.appendChild(img);
        artista.appendChild(didascalia);

        artistaView.appendChild(artista);
    }

    libreria.appendChild(artistaView);
}
function braniPiaciutiF(event){
    event.preventDefault();
    console.log("16.33");

    const sectionDestra = document.querySelector('.destra');
    const sectionBrani = document.querySelector('.BraniPiaciuti');

    if (document.querySelector('.BraniPiaciuti').children.length != 0){
        sectionDestra.classList.remove('hidden');
        sectionBrani.innerHTML = "";
        return;
    }

    const album = document.querySelector('.AlbumSalvati');
    if (album.children.length != 0)
        album.innerHTML = "";


    const artisti = document.querySelector('.ArtistiSeguiti');
    if (artisti.children.length != 0)
        artisti.innerHTML = "";

    const creaPlaylist = document.querySelector('.CreaPlaylist');
    if (creaPlaylist.children.length != 0)
        creaPlaylist.innerHTML = "";
        
    const playlist = document.querySelector('.Playlist');
    if (playlist.children.length != 0)
        playlist.innerHTML = "";

    sectionDestra.classList.add('hidden');
    
    
    fetch("recentLikeSong.php").then(onResponse).then(onJsonBraniPiaciuti);
    
   
}

function albumSalvatiF(event){
    event.preventDefault();
   
    const sectionDestra = document.querySelector('.destra')
    const sectionAlbum = document.querySelector('.AlbumSalvati');

    if (sectionAlbum.children.length != 0){
        sectionDestra.classList.remove('hidden');
        sectionAlbum.innerHTML = "";
        return;
    }

   const brani = document.querySelector('.BraniPiaciuti');
    if (brani.children.length != 0)
        brani.innerHTML = "";

    const artisti = document.querySelector('.ArtistiSeguiti');
    if (artisti.children.length != 0)
        artisti.innerHTML = "";

    const playlist = document.querySelector('.Playlist');
    if (playlist.children.length != 0)
        playlist.innerHTML = "";

    const creaPlaylist = document.querySelector('.CreaPlaylist');
    if (creaPlaylist.children.length != 0)
        creaPlaylist.innerHTML = "";

    sectionDestra.classList.add('hidden');

    fetch("recentLikeAlbum.php").then(onResponse).then(onJsonAlbumSalvatiView);
}


function artistiSeguitiF(event){
    event.preventDefault();

    const sectionDestra = document.querySelector('.destra')
    const sectionArtisti = document.querySelector('.ArtistiSeguiti');

    if (sectionArtisti.children.length != 0){
        sectionDestra.classList.remove('hidden');
        sectionArtisti.innerHTML = "";
        return;
    }

   const brani = document.querySelector('.BraniPiaciuti');
    if (brani.children.length != 0)
        brani.innerHTML = "";

    const album = document.querySelector('.AlbumSalvati');
    if (album.children.length != 0)
        album.innerHTML = "";

    const creaPlaylist = document.querySelector('.CreaPlaylist');
    if (creaPlaylist.children.length != 0)
        creaPlaylist.innerHTML = "";

    const playlist = document.querySelector('.Playlist');
    if (playlist.children.length != 0)
        playlist.innerHTML = "";


    sectionDestra.classList.add('hidden');

    fetch("getArtistiSeguiti.php").then(onResponse).then(onJsonArtistiSeguiti);
}

function btnCreaF(formData){
    fetch("insertPlaylist.php", {
        method: "POST",
        body: formData
    });
    console.log("19.24");
}

function creaButtonF(event){
    event.preventDefault();

    const sectionDestra = document.querySelector('.destra')
    const creaPlaylist = document.querySelector('.CreaPlaylist');
    if (creaPlaylist.children.length != 0){ 
        sectionDestra.classList.remove('hidden');
        creaPlaylist.innerHTML = "";
    return;
    }

   const Artisti = document.querySelector('.ArtistiSeguiti');
   if (Artisti.children.length != 0)
        Artisti.innerHTML = "";

   const brani = document.querySelector('.BraniPiaciuti');
    if (brani.children.length != 0)
        brani.innerHTML = "";

    const album = document.querySelector('.AlbumSalvati');
    if (album.children.length != 0)
        album.innerHTML = "";

    const creaPlaylistOld = document.querySelector('.CreaPlaylist');
    if (creaPlaylistOld.children.length != 0)
        creaPlaylistOld.innerHTML = "";

    const playlist = document.querySelector('.Playlist');
    if (playlist.children.length != 0)
        playlist.innerHTML = "";

    sectionDestra.classList.add('hidden');
    const libreria = document.querySelector('.CreaPlaylist');

    const header = document.createElement('div');

    header.classList.add('headerCreaPlaylist');
    const h1 = document.createElement('h1');
    h1.textContent = "Creazione playlist";

    header.appendChild(h1);
    libreria.appendChild(header);

    const form = document.createElement('form');
    form.name = "formCreaPlaylist";
    form.id = "formCreaPlaylist";
    form.classList.add('form');

    
    const boxName = document.createElement('div');
    boxName.classList.add('boxName');
    const labelName = document.createElement('label');
    labelName.textContent = "Nome nuova playlist";
    labelName.classList.add('labelName');
    const nameForm = document.createElement('input');
    nameForm.type = "text";
    nameForm.name = "name";
    nameForm.id = "inputNomePlaylist";

    const boxBtn = document.createElement('div');
    boxBtn.classList.add('submit-container');
    const boxBtnInterno = document.createElement('div');
    boxBtnInterno.classList.add('crea-btn');
    const btnForm = document.createElement('input');
    btnForm.type = "submit";
    btnForm.value = "CREA"

    boxName.appendChild(labelName);
    boxName.appendChild(nameForm);
    boxBtnInterno.appendChild(btnForm);
    boxBtn.appendChild(boxBtnInterno);
    form.appendChild(boxName);
    form.appendChild(boxBtn);
    libreria.appendChild(form);

    nameForm.value = document.querySelector('#inputNomePlaylist').value;
    
    
    btnForm.addEventListener('click', function(event){
        event.preventDefault();
        const formData = new FormData(form);
        btnCreaF(formData);
    });

}

function onJsonViewPlaylist(json){
    console.log(json);

    const risultati = json;
    const nRisultati = risultati.length;

    const libreria = document.querySelector('.Playlist');
    const header = document.createElement('div');
    header.classList.add('headerPlaylist');
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('headerPlaylistContainer');

    const svgContent = document.createElement('div');
    svgContent.innerHTML =   `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  
            <rect x="8" y="12" width="32" height="4" rx="2" fill="#000000"/>
            <rect x="8" y="24" width="32" height="4" rx="2" fill="#000000"/>
            <rect x="8" y="36" width="32" height="4" rx="2" fill="#000000"/>
            <polygon points="44,20 60,32 44,44" fill="#000000"/>
            </svg>`;
    svgContent.classList.add('headerPlaylist-svg');
    
    const h3 = document.createElement('h3');
    h3.classList.add('h3');
    h3.textContent = "Playlist";
    
    const h1 = document.createElement('h1');
    h1.classList.add('h1');
    h1.textContent = risultati[0].Nome; 

    const h2 = document.createElement('h2');
    h2.classList.add('h2');
    const link = document.createElement('a');
    link.href = "";
    link.classList.add('link');
    link.textContent = document.querySelector('#destra-header-utente h1').textContent;

    h2.appendChild(link);
    const textNode = document.createTextNode(nRisultati + " brani");
    h2.appendChild(textNode);
    headerContainer.appendChild(h3);
    headerContainer.appendChild(h1);
    headerContainer.appendChild(h2);

    header.appendChild(svgContent);
    header.appendChild(headerContainer);
    libreria.appendChild(header);

    const BranoView = document.createElement('div');
    BranoView.classList.add('playlistView');
    BranoView.classList.add('playlistViewCreate');
    console.log("Ho aggiunto la scrollbar");
    BranoView.innerHTML = "";
    
    for(let i = 0; i < nRisultati; i++){
        const datiBrano = risultati[i];

        const titolo = datiBrano.Titolo;
        const image = datiBrano.Image;
        const durata = datiBrano.Durata;

        const brano = document.createElement('div');
        brano.classList.add('playlist');

        const indice = document.createElement('div');
        indice.classList.add('indice');
        const value = document.createElement('p')
        value.textContent = i + 1;

        const img = document.createElement('img');
        img.src = image;
        img.classList.add('img');
        const didascalia = document.createElement('div');
        didascalia.classList.add('didascaliaPlaylist');
        const didascaliaTitArt = document.createElement('div');
        didascaliaTitArt.classList.add('didTitArt');
        const didTitolo = document.createElement('span');
        didTitolo.textContent = titolo;
        const didArt = document.createElement('span');
        didArt.textContent = datiBrano.artisti;
        didArt.classList.add('artistiStyle');

        const didDurata = document.createElement('span');
        const minuti = Math.floor(durata / 60000);
        const secondi = Math.floor((durata % 60000) / 1000);
        didDurata.textContent = + minuti + ":" + (secondi < 10 ? '0' : '') + secondi;
        

        indice.appendChild(value);
        brano.appendChild(indice);
        brano.appendChild(img);
        didascaliaTitArt.appendChild(didTitolo);
        didascaliaTitArt.appendChild(didArt);
        didascalia.appendChild(didascaliaTitArt);
        didascalia.appendChild(didDurata);
        brano.appendChild(didascalia);
        BranoView.appendChild(brano);

    }
    libreria.appendChild(BranoView);
}

function playlistViewF(id){
    const sectionDestra = document.querySelector('.destra')
    const sectionPlaylist = document.querySelector('.Playlist');

    
    if (sectionPlaylist.children.length != 0){
        sectionDestra.classList.remove('hidden');
        sectionPlaylist.innerHTML = "";
        return;
    }
    
    const brani = document.querySelector('.BraniPiaciuti');
    if (brani.children.length != 0)
        brani.innerHTML = "";
    
    const album = document.querySelector('.AlbumSalvati');
    if (album.children.length != 0)
        album.innerHTML = "";
    
    const Artisti = document.querySelector('.ArtistiSeguiti');
    if (Artisti.children.length != 0)
        Artisti.innerHTML = "";
    
    sectionDestra.classList.add('hidden');

    const idForm = document.createElement('input');
    idForm.name = "id";
    idForm.value = id;
    idForm.classList.add('hidden');
    
    const form = document.createElement('form');
    form.appendChild(idForm);
    
    const formData = new FormData(form);

   fetch("getBraniByPlaylist.php", {
        method: "POST",
        body: formData
    }).then(onResponse).then(onJsonViewPlaylist);
}

function onJsonPlaylist(json){
    const risultati = json;
    const nRisultati = risultati.length;
    console.log(risultati);

    const h1 = document.querySelector('#LibreriaContainer-elencoPlaylist-header h1');
    if (nRisultati == 0)
        h1.textContent = "";
    else h1.textContent = "Elenco playlist che hai creato";


    const libreria = document.querySelector('.LibreriaContainer-elencoPlaylist');
    for (let i = 0; i < nRisultati; i++){
        const datiPlaylist = risultati[i];
        
        const nome = datiPlaylist.Nome;
        const id = datiPlaylist.ID;

        const a = document.createElement('a');
        a.href = "";
        a.id = "LibreriaContainer-Playlist";
        a.innerHTML =  `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  
            <rect x="8" y="12" width="32" height="4" rx="2" fill="#000000"/>
            <rect x="8" y="24" width="32" height="4" rx="2" fill="#000000"/>
            <rect x="8" y="36" width="32" height="4" rx="2" fill="#000000"/>
            <polygon points="44,20 60,32 44,44" fill="#000000"/>
            </svg>`;
        a.classList.add('LibreriaContainer-Playlist');

        const didascalia = document.createElement('div');
        didascalia.classList.add('LibreriaContainer-Playlist-didascalia');
        const spanNome = document.createElement('span');
        spanNome.textContent = nome;
        //spanNumBrani

        didascalia.appendChild(spanNome);
        a.appendChild(didascalia);
        libreria.appendChild(a);

        a.addEventListener('click', function(event){
            event.preventDefault();
            playlistViewF(id);
        });

    }
}

function playlistF(event){
    fetch("getPlaylistByUser.php").then(onResponse).then(onJsonPlaylist);
}

const icon = document.querySelector("#iconjs");
icon.addEventListener('click', iconF);


document.addEventListener('DOMContentLoaded', artistiF);
document.addEventListener('DOMContentLoaded', braniF);
document.addEventListener('DOMContentLoaded', albumF);
document.addEventListener('DOMContentLoaded', playlistF);

const braniPiaciutiButton = document.querySelector('#LibreriaContainer-BraniPiaciuti');
braniPiaciutiButton.addEventListener('click', braniPiaciutiF);

const albumSalvatiButton = document.querySelector('#LibreriaContainer-AlbumPiaciuti');
albumSalvatiButton.addEventListener('click', albumSalvatiF);

const artistiSeguiti = document.querySelector('#LibreriaContainer-ArtistiSeguiti')
artistiSeguiti.addEventListener('click', artistiSeguitiF);

const creaButton = document.querySelector('#sinistra-header-crea');
creaButton.addEventListener('click', creaButtonF);