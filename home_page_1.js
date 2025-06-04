function onResponseCreatoPerTe(response){
    return response.json();
}


function onJsonCreatoPerTeBrano(json){
    console.log(json);

    const libreria = document.querySelector('.BraniPiaciuti');
    
    libreria.innerHTML = '';

    const header = document.createElement('h1');
    header.textContent = "Brani";
    header.classList.add('h1');

    const risultati = json;
    let nRisultati = risultati.length;

    if (risultati == 0 && !document.querySelector('#creatoPerTeContainer-header').contains(document.querySelector('.AlbumPiaciuti h1'))){
        const noResult = document.createElement('p');
        noResult.textContent = "Non hai ancora ascoltato nessun brano. Cerca la canzone che desideri.";
        noResult.classList.add('p');
        libreria.appendChild(noResult);
        return;
    }

    if (nRisultati > 4)
        nRisultati = 4;

    
    
    libreria.appendChild(header);
    for(let i=0; i<nRisultati; i++){
        const datiBrano = risultati[i];
        const titolo = datiBrano.Titolo;
        const immagineSelezionata = datiBrano.Image;
        


        const brano = document.createElement('div');
        brano.classList.add('brano');
        const img = document.createElement('img');
        img.src = immagineSelezionata;
        const didascalia = document.createElement('div');
        const didTitolo = document.createElement('span');
        const durata = datiBrano.Durata;
        const didDurata = document.createElement('span');
        const minuti = Math.floor(durata / 60000);
        const secondi = Math.floor((durata % 60000) / 1000);
        didTitolo.textContent = titolo  + " | " + minuti + ":" + (secondi < 10 ? '0' : '') + secondi;
        didascalia.appendChild(didTitolo);

        didascalia.classList.add('didascaliaBrano');

        
        const didArtisti = document.createElement('span');
        didArtisti.textContent = datiBrano.artisti;
        
        didascalia.appendChild(didArtisti);
    
        brano.appendChild(img);
        brano.appendChild(didascalia);
        
        libreria.appendChild(brano);
    }
    console.log("Sono l'ultimo js aggiornato ora");
}

function onJsonCreatoPerTeAlbum(json){
    const libreria = document.querySelector('.AlbumPiaciuti');
    //libreria.classList.add('marginjs', 'sfumato-verde');
    libreria.innerHTML = '';

    const header = document.createElement('h1');
    header.textContent = "Album";
    header.classList.add('h1');

    
    const risultati = json;
    let nRisultati = risultati.length;
    
    if (nRisultati > 4)
        nRisultati = 4;
    
    if (nRisultati > 0) libreria.appendChild(header);
    for(let i=0; i<nRisultati; i++){
        const datiAlbum = risultati[i];
        const titolo = datiAlbum.Titolo;
        
        const immagineSelezionata = datiAlbum.Image;
        
        
        
        const didascalia = document.createElement('div');
        const didTitolo = document.createElement('span');
        didTitolo.textContent = "Album: "+ titolo;
        didascalia.appendChild(didTitolo);

        
        const numTracce = datiAlbum.NumeroTracce;
        const dataRilascio = datiAlbum.DataRilascio;
    
        const album = document.createElement('div');
        album.classList.add('album');
        const img = document.createElement('img');
        img.src = immagineSelezionata;
        
        const didNumTracce = document.createElement('span');
        didNumTracce.textContent = "Numero di tracce: " + numTracce;
        const didDataRilascio = document.createElement('span');
        didDataRilascio.textContent = "Data di rilascio: " + dataRilascio;

        const didArtisti = document.createElement('span');
        didArtisti.textContent = datiAlbum.artisti;
        
        didascalia.appendChild(didArtisti);

        didascalia.appendChild(didNumTracce);
        didascalia.appendChild(didDataRilascio);
        didascalia.classList.add('didascaliaAlbum');
        album.appendChild(img);
        album.appendChild(didascalia);
        libreria.appendChild(album);
        console.log(datiAlbum);
    }    
}


function creatoPerTeF(event){
    
    fetch("recentLikeSong.php"
    ).then(onResponseCreatoPerTe).then(onJsonCreatoPerTeBrano);

    fetch("recentLikeAlbum.php"
    ).then(onResponseCreatoPerTe).then(onJsonCreatoPerTeAlbum);
    /*fetch("recentLikeAlbum.php")
        .then(response => response.text())
        .then(text => {
            console.log("Risposta grezza dal server:", text);
    });*/
}

function likeAlbumF(button){
    console.log("HAi messo like da javascript");
    if (button.value === "MI PIACE"){
        button.value = "NON MI PIACE PIù";
    } else {
        button.value = "MI PIACE";
    }

    const form = document.querySelector('#Album-view-form')
    const formData = new FormData(form);

    fetch("likeAlbum.php", {
        method: "POST",
        body: formData
    }).then(response => response.text()).then(result => {
        console.log("Risposta dal server:", result);
});

}

function getFormDataAlbum(titolo, image, numTracce, dataRilascio){
    const form = document.createElement('form');

    const titoloForm = document.createElement('input');
    titoloForm.type = "text";
    titoloForm.name = "titolo";
    titoloForm.value = titolo;

    const imageForm = document.createElement('input');
    imageForm.type = "text";
    imageForm.name = "image";
    imageForm.value = image;

    const numTracceForm = document.createElement('input');
    numTracceForm.type = "text";
    numTracceForm.name = "numTracce";
    numTracceForm.value = numTracce;

    const dataRilascioForm = document.createElement('input');
    dataRilascioForm.type = "text";
    dataRilascioForm.name = "dataRilascio";
    dataRilascioForm.value = dataRilascio;

    form.appendChild(titoloForm);
    form.appendChild(numTracceForm);
    form.appendChild(dataRilascioForm);
    form.appendChild(imageForm);

    const formData = new FormData(form);
    return formData;
}

function chiusuraView(libreria, chiusura, x_content){
    libreria.innerHTML = "";
    x_content.innerHTML = "";
    chiusura.removeChild(x_content);
    document.querySelector('.creatoPerTe').classList.remove('hidden');
}



function getFormDataArtist(name, image, numFollower, genere){
    const form = document.createElement('form');
    
    const nameForm = document.createElement('input');
    nameForm.type = "text";
    nameForm.name = "name";
    nameForm.value = name;

    const imageForm = document.createElement('input');
    imageForm.type = "text";
    imageForm.name = "image";
    imageForm.value = image;

    const numFollowerForm = document.createElement('input');
    numFollowerForm.type = "text";
    numFollowerForm.name = "numFollower";
    numFollowerForm.value = numFollower;

    const genereForm = document.createElement('input');
    genereForm.type = "text";
    genereForm.name = "genere";
    genereForm.value = genere;

    form.appendChild(nameForm);
    form.appendChild(imageForm);
    form.appendChild(numFollowerForm);
    form.appendChild(genereForm);

    const formData = new FormData(form);
    return formData;

}


function onJsonAlbum(json){
    const chiusura = document.querySelector('.close-button');
    chiusura.classList.add('chiusuraAlbum');
    const artistaView = document.querySelector('#Artista-view');
    artistaView.innerHTML = "";
    branoView = document.querySelector('#Brano-view');
    branoView.innerHTML = "";

    document.querySelector('.creatoPerTe').classList.add('hidden');
    const closePrec = document.querySelector('#closeView');
    if (closePrec != null) closePrec.remove();
    if (!chiusura.contains(document.querySelector('#closeView'))){
        const x_content = document.createElement('a');
        x_content.id = "closeView";
        x_content.innerHTML =  `
                  <svg class="close-button" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>`;
        x_content.href = "";
        x_content.classList.add('close-button');
        chiusura.appendChild(x_content);
        x_content.addEventListener('click', function(event){
            event.preventDefault();
            chiusuraView(document.querySelector('#Album-view'), chiusura, x_content);
        });
    }
    
    const libreria = document.querySelector('#Album-view');
    libreria.classList.add('marginjs', 'sfumato-verde');
    libreria.innerHTML = '';
    const risultati = json.albums.items;
    let nRisultati = risultati.length;
    
    if (nRisultati > 16)
        nRisultati = 16;

    for(let i=0; i<nRisultati; i++){
        const datiAlbum = risultati[i];
        const titolo = datiAlbum.name;
        const titoloForm = document.createElement('input');
        titoloForm.type = "text";
        titoloForm.name = "titolo";
        titoloForm.value = titolo;
        titoloForm.classList.add('hidden');
        const artisti = []; 
        const artistiForm = [];
        
        for (let j = 0; j < datiAlbum.artists.length; j++){
            artisti[j] = datiAlbum.artists[j].name;
            artistiForm[j] = document.createElement('input');
            artistiForm[j].type = "text";
            artistiForm[j].name = "artisti[]";
            artistiForm[j].value = artisti[j];
            artistiForm[j].classList.add('hidden');
        }
        const immagineSelezionata = datiAlbum.images[0].url;
        const immagineForm = document.createElement('input');
        immagineForm.type = "text";
        immagineForm.name = "image";
        immagineForm.value = immagineSelezionata;
        immagineForm.classList.add('hidden');
        const numTracce = datiAlbum.total_tracks;
        const numTracceForm = document.createElement('input');
        numTracceForm.type = "text";
        numTracceForm.name = "numTracce";
        numTracceForm.value = numTracce;
        numTracceForm.classList.add('hidden');
        const dataRilascio = datiAlbum.release_date;
        const dataRilascioForm = document.createElement('input');
        dataRilascioForm.type = "input";
        dataRilascioForm.name = "dataRilascio";
        dataRilascioForm.value = dataRilascio;
        dataRilascioForm.classList.add('hidden');
        const button  = document.createElement('input');
        button.type = 'submit';
        button.classList.add('Giacomo');
        button.id = "formSubmit";

        const formData = getFormDataAlbum(titolo, immagineSelezionata, numTracce, dataRilascio);

        fetch("isLikeAlbum.php", {
            method: "POST",
            body: formData
        }).then(response => response.text()).then(result => {
            console.log(result);
            if (result !== "MI PIACE" && result !== "NON MI PIACE PIù")
                button.value = "undefined";
            else 
                button.value = result;
        });
    

        const form = document.createElement('form');
        form.id = "Album-view-form";
        form.name = "Album-form";
        form.classList.add('like');
        form.appendChild(titoloForm);
        form.appendChild(immagineForm);
        form.appendChild(numTracceForm);
        form.appendChild(dataRilascioForm);
        for (let j = 0; j < artistiForm.length; j++)
            form.appendChild(artistiForm[j]);
        form.appendChild(button); 
        button.addEventListener('click', function(event){
            event.preventDefault();
            likeAlbumF(button);
        }); 
        const album = document.createElement('div');
        album.classList.add('album');
        const img = document.createElement('img');
        img.src = immagineSelezionata;
        const didascalia = document.createElement('div');
        const didTitolo = document.createElement('span');
        didTitolo.textContent = "Album: "+ titolo;
        const didArtisti = [];
        for (let j = 0; j < artisti.length; j++){
            didArtisti[j] = document.createElement('span');
            didArtisti[j].textContent = "Artista: " + artisti[j];
        }
        const didNumTracce = document.createElement('span');
        didNumTracce.textContent = "Numero di tracce: " + numTracce;
        const didDataRilascio = document.createElement('span');
        didDataRilascio.textContent = "Data di rilascio: " + dataRilascio;
        didascalia.appendChild(didTitolo);
        for (let j = 0; j < artisti.length; j++){
            didascalia.appendChild(didArtisti[j]);
        }
        didascalia.appendChild(didNumTracce);
        didascalia.appendChild(didDataRilascio);
        didascalia.classList.add('didascaliaAlbum');
        album.appendChild(img);
        album.appendChild(didascalia);
        album.appendChild(form);
        libreria.appendChild(album);

        //console.log(datiAlbum);
    }
}

function onResponseAlbum(response){
    return response.json();
}

function likeBranoF(button){
    if (button.value === "MI PIACE"){
        button.value = "NON MI PIACE PIù";
    } else {
        button.value = "MI PIACE";
    }
    const form = document.querySelector('#Brano-view-form');

    const formData = new FormData(form);

    fetch("likeSong.php", {
        method: "POST",
        body: formData
    }).then(response => response.text()).then(result => {
        console.log("Risposta dal server:" + result);
    });

}

function onResponse(response){
    return response.json();
}

function insertOnPlaylist(titolo, image, durata){
    const form = document.createElement('form');

    const titoloVero = titolo.split(": ")[1];
    
    const titoloForm = document.createElement('input');
    titoloForm.type = "text";
    titoloForm.name = "titolo";
    titoloForm.value = titoloVero;
    console.log(titoloForm.value);
    
    const imageForm = document.createElement('input');
    imageForm.type = "text";
    imageForm.name = "image";
    imageForm.value = image;
    console.log(imageForm.value);

    const parti = durata.split(':');  
    const minuti = parseInt(parti[1], 10);
    const secondi = parseInt(parti[2], 10);

    console.log("minuti: " + minuti);
    console.log("secondo: "+ secondi);

    const durataMs = (minuti * 60 + secondi) * 1000;

    const durataForm = document.createElement('input');
    durataForm.type = "text";
    durataForm.name = "durata";
    durataForm.value = durataMs;
    console.log(durataForm.value);

    const select = document.querySelector('#selectChoisePlaylist');
    const nomePlaylist = select.value;
    const nomePlaylistForm = document.createElement('input');
    nomePlaylistForm.type = "text";
    nomePlaylistForm.name = "nomeplaylist";
    nomePlaylistForm.value = nomePlaylist;
    console.log(nomePlaylistForm.value);


    form.appendChild(nomePlaylistForm);
    form.appendChild(titoloForm);
    form.appendChild(imageForm);
    form.appendChild(durataForm);
    const formData = new FormData(form);

    fetch("insertOnPlaylist.php", {
        method: "POST",
        body: formData
    });
}

function onJsonPlaylistChoise(json){
    const button2 = document.querySelector('#divPlaylist');


    const risultati = json;
    console.log(risultati);
    const nRisultati = risultati.length;

    const form = document.createElement('form');
    const select = document.createElement('select');
    select.id = "selectChoisePlaylist";

    for (let i = 0; i < nRisultati; i++){
        const datiPlaylist = risultati[i];
        const nome = datiPlaylist.Nome;

        const inputForm = document.createElement('option');
        inputForm.value = nome;
        inputForm.textContent = nome;
        select.appendChild(inputForm);
    }

    const confirm = document.createElement('input');
    confirm.type = "submit";
    confirm.value = "CONFIRM";
    confirm.id = "submitPlaylist";

    form.appendChild(select);
    form.appendChild(confirm);
    button2.appendChild(form);

    const titolo = document.querySelector('#titoloBrano').textContent;
    const image = document.querySelector('#imgBrano').src;
    const durata = document.querySelector('#durataBrano').textContent;

    confirm.addEventListener('click', function(event){
        event.preventDefault();
        insertOnPlaylist(titolo, image, durata);
    });
    
}

function addPlaylist(event){
    event.preventDefault();

    const menu = document.querySelector('#divPlaylist')
    if (menu.children.length != 0){
        menu.innerHTML = "";
        return;
    }

    fetch("getPlaylistByUser.php").then(onResponse).then(onJsonPlaylistChoise);
}

function getFormDataBrano(titolo, image, durata){
    const form = document.createElement('form');
    
    const titoloForm = document.createElement('input');
    titoloForm.type = "text";
    titoloForm.name = "titolo";
    titoloForm.value = titolo;
    
    const imageForm = document.createElement('input');
    imageForm.type = "text";
    imageForm.name = "image";
    imageForm.value = image;

    const durataForm = document.createElement('input');
    durataForm.type = "text";
    durataForm.name = "durata";
    durataForm.value = durata;

    form.appendChild(titoloForm);
    form.appendChild(imageForm);
    form.appendChild(durataForm);

    const formData = new FormData(form);

    return formData;
}

function onJsonBrano(json){
    const chiusura = document.querySelector('.close-button');
    chiusura.classList.add('chiusuraAlbum');
    const albumView = document.querySelector('#Album-view');
    albumView.innerHTML = "";
    const artistaView = document.querySelector('#Artista-view');
    artistaView.innerHTML = "";

    document.querySelector('.creatoPerTe').classList.add('hidden');

    const closePrec = document.querySelector('#closeView');
    if (closePrec != null) closePrec.remove();
    if (!chiusura.contains(document.querySelector('#closeView'))){
        const x_content = document.createElement('a');
        x_content.id = "closeView";
        x_content.innerHTML =  `
                  <svg class="close-button" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>`;
        x_content.href = "";
        x_content.classList.add('close-button');
        chiusura.appendChild(x_content);
        x_content.addEventListener('click', function(event){
            event.preventDefault();
            chiusuraView(document.querySelector('#Brano-view'), chiusura, x_content);
        });
    }

    const libreria = document.querySelector('#Brano-view');
    libreria.classList.add('sfumato-verde');
    libreria.innerHTML = '';

    const risultati = json.tracks.items;
    let nRisultati = risultati.length

    if (nRisultati > 4)
        nRisultati = 4;

    for(let i=0; i<nRisultati; i++){
        const datiBrano = risultati[i];
        console.log(datiBrano);
        const titolo = datiBrano.name;
        const titoloForm = document.createElement('input');
        titoloForm.type = "text";
            titoloForm.name = "titolo";
            titoloForm.value = titolo;
            titoloForm.classList.add('hidden');
            const immagineSelezionata = datiBrano.album.images[0].url;
            const immagineForm = document.createElement('input');
            immagineForm.type = "text";
            immagineForm.name = "image";
            immagineForm.value = immagineSelezionata;
            immagineForm.classList.add('hidden');
            const artisti = [];
            const artistiForm = [];
            for (let j = 0; j < datiBrano.artists.length; j++){
                artisti[j] = datiBrano.artists[j].name;
                artistiForm[j] = document.createElement('input');
                artistiForm[j].type = "text";
                artistiForm[j].name = "artisti[]";
                artistiForm[j].value = artisti[j];
                artistiForm[j].classList.add('hidden');
            }
            const durata = datiBrano.duration_ms;
            const durataForm = document.createElement('input');
            durataForm.type = "text";
            durataForm.name = "durata";
            durataForm.value = durata;
            durataForm.classList.add('hidden');

            const button = document.createElement('input');
            button.type = 'submit';
            button.classList.add('Giacomo');
            button.id = "formSubmit";


            const formData = getFormDataBrano(titolo, immagineSelezionata, durata);

            fetch("isLikeSong.php", {
                method: "POST",
                body: formData
            }).then(response => response.text()).then(result => {
                console.log(result);
                if (result !== "MI PIACE" && result !== "NON MI PIACE PIù")
                    button.value = "undefined";
                else 
                    button.value = result;
            });

            const button2 = document.createElement('input');
            button2.type = 'submit';
            button2.value = "Add at playlist"
            button2.classList.add('Giacomo');
            button2.classList.add('dislikeBrano');
            button2.id = "button2";

            const form = document.createElement('form');
            form.id = "Brano-view-form";
            form.name = "Brano-form";

            form.classList.add('likeBrano');
            form.appendChild(titoloForm);
            form.appendChild(immagineForm);
            form.appendChild(durataForm);
            for (let j = 0; j < artistiForm.length; j++)
                form.appendChild(artistiForm[j]);
            form.appendChild(button);
            button.addEventListener('click', function (event) {
                event.preventDefault();
                likeBranoF(button);
            });
            form.appendChild(button2);
            button2.addEventListener('click', addPlaylist);

            const brano = document.createElement('div');
            brano.classList.add('brano');
            const img = document.createElement('img');
            img.src = immagineSelezionata;
            img.id = "imgBrano";
            const didascalia = document.createElement('div');
            const didTitolo = document.createElement('span');
            didTitolo.id = "titoloBrano";
            didTitolo.textContent = `Brano: ${titolo}`;
            const didArtisti = [];
            for (let j = 0; j < artisti.length; j++){
                didArtisti[j] = document.createElement('span');
                didArtisti[j].textContent = "Artista: " + artisti[j];
            }
            const didDurata = document.createElement('span');
            didDurata.id = "durataBrano";
            const minuti = Math.floor(durata / 60000);
            const secondi = Math.floor((durata % 60000) / 1000);
            didDurata.textContent = "Durata: " + minuti + ":" + (secondi < 10 ? '0' : '') + secondi;

            didascalia.appendChild(didTitolo);
            for (let j = 0; j < artisti.length; j++){
                didascalia.appendChild(didArtisti[j]);
            }
            didascalia.appendChild(didDurata);
            didascalia.classList.add('didascaliaBrano');

            brano.appendChild(img);
            brano.appendChild(didascalia);
            brano.appendChild(form);
            const divPlayList = document.createElement('div');
            divPlayList.id = "divPlaylist"
            brano.appendChild(divPlayList);
            libreria.appendChild(brano);
        }
        console.log("Sono l'ultimo js aggiornato ora");

}

function seguiArtistaF(button){
    if (button.value === "SEGUI"){
        button.value = "NON SEGUIRE PIù";
    } else {
        button.value = "SEGUI";
    }
    const form = document.querySelector('#Artista-view-form');

    const formData = new FormData(form);

    fetch("followArtist.php", {
        method: "POST",
        body: formData
    }).then(response => response.text()).then(result => {
        console.log("Risposta dal server:", result);
    });

}

function onJsonArtist(json){
    const chiusura = document.querySelector('.close-button');
    chiusura.classList.add('chiusuraAlbum');
    const albumView = document.querySelector('#Album-view');
    albumView.innerHTML = "";
    branoView = document.querySelector('#Brano-view');
    branoView.innerHTML = "";

    document.querySelector('.creatoPerTe').classList.add('hidden');
    const closePrec = document.querySelector('#closeView');
    if (closePrec != null) closePrec.remove();
    if (!chiusura.contains(document.querySelector('#closeView'))){
        const x_content = document.createElement('a');
        x_content.id = "closeView";
        x_content.innerHTML =  `
                  <svg class="close-button" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>`;
        x_content.href = "";
        x_content.classList.add('close-button');
        chiusura.appendChild(x_content);
        x_content.addEventListener('click', function(event){
            event.preventDefault();
            chiusuraView(document.querySelector('#Artista-view'), chiusura, x_content);
        });
    }
    
    const libreria = document.querySelector('#Artista-view');
    libreria.innerHTML = '';
    const risultati = json.artists.items;

    const datiArtista = risultati[0];
    console.log(datiArtista);

    const nomeArtista = datiArtista.name;
    const nomeArtistaForm = document.createElement('input');
    nomeArtistaForm.type = "text";
    nomeArtistaForm.name = "name";
    nomeArtistaForm.value = nomeArtista;
    nomeArtistaForm.classList.add('hidden');

    const immagineSelezionata = datiArtista.images[0].url;
    const immagineSelezionataForm = document.createElement('input');
    immagineSelezionataForm.type = "text";
    immagineSelezionataForm.name = "image";
    immagineSelezionataForm.value = immagineSelezionata;
    immagineSelezionataForm.classList.add('hidden');

    const numFollower = datiArtista.followers.total;
    const numFollowerForm = document.createElement('input');
    numFollowerForm.type = "text";
    numFollowerForm.name = "numFollower";
    numFollowerForm.value = numFollower;
    numFollowerForm.classList.add('hidden');

    const genere = datiArtista.genres[0];
    const genereForm = document.createElement('input');
    genereForm.type = "text";
    genereForm.name = "genere";
    genereForm.value = genere;
    genereForm.classList.add('hidden');

    const button = document.createElement('input');
    button.type = "submit";
    button.classList.add('Giacomo');
    button.id = "formSubmit";

    const formData = getFormDataArtist(nomeArtista, immagineSelezionata, numFollower, genere);

    fetch("isFollowArtist.php", {
        method: "POST",
        body: formData
    }).then(response => response.text()).then(result => {
        console.log(result);
        if (result !== "SEGUI" && result !== "NON SEGUIRE PIù")
            button.value = "undefined";
        else 
            button.value = result;
    });

    const form = document.createElement('form');
    form.id = "Artista-view-form";
    form.name = "Artista-form";

    form.appendChild(nomeArtistaForm);
    form.appendChild(immagineSelezionataForm);
    form.appendChild(numFollowerForm);
    form.appendChild(genereForm);
    form.appendChild(button);

    button.addEventListener('click', function(event) {
        event.preventDefault();
        seguiArtistaF(button);
    })

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
    artista.appendChild(form);
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

let click = false;

function iconF(event){
    event.preventDefault();
    let libreria = document.querySelector('#generateMenujs');
    libreria.innerHTML = '';
    
    if (!click){
        libreria.classList.remove('hidden');
        let container = document.createElement('div');
        container.classList.add('menuTendinaContainer');
        let profile = document.createElement('a');
        profile.textContent = "Profile";
        profile.href = "profile.php";
        let logout = document.createElement('a');
        logout.textContent = "Logout";
        logout.href = "logout.php";
        
        profile.classList.add('menuTendina');
        logout.classList.add('menuTendina');
        container.appendChild(profile);
        container.appendChild(logout);
        libreria.appendChild(container);
        click = true;
    } else {
        libreria.classList.add('hidden');
        profile = null;
        logout = null;
        container = null;
        libreria = null;
        click = false;
        
    }
    
}


document.addEventListener('DOMContentLoaded', creatoPerTeF);
console.log("Giacomo Pisana 27/05 17.06");

const barraRicerca = document.querySelector('#Ricerca-flex-container-box-Barra');
barraRicerca.addEventListener('submit', barraRicercaF);

const barraRicercaMobile = document.querySelector('#Ricerca-flex-container-box-Barra-mobile');
barraRicercaMobile.addEventListener('submit', barraRicercaFMobile);

const classificaGlobal = document.querySelector('#Classifiche-flex-container-box');
classificaGlobal.addEventListener('submit', generaClassificaGlobal);

const classificaGlobal1 = document.querySelector('#Classifiche-flex-container-box_1');
classificaGlobal1.addEventListener('submit', generaClassificaGlobal1); 

const icon = document.querySelector("#iconjs");
icon.addEventListener('click', iconF);