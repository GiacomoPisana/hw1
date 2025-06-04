<?php
            
            require_once 'auth.php';
            if (!$user_id = checkAuth()){
                header("Location: login.php");
                exit;
            } else {
                $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));
                $idUtente = mysqli_real_escape_string($conn, $user_id);
                $query = "SELECT * FROM users WHERE ID = $user_id";
                $res = mysqli_query($conn, $query);
                $infoUtente = mysqli_fetch_assoc($res);

            }
        ?>
        
        <html>	
		<head>
			<head>
				<meta charset="utf-8">
				<title>Spotify - <?php 
                    $name = $infoUtente["Nome"];
                    $surname = $infoUtente["Cognome"];
                    echo "$name $surname"; 
                ?></title>
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link href="https://fonts.googleapis.com/css?family=Lora:400,400i|Open+Sans:400,700" rel="stylesheet">
			<!--	<link rel="stylesheet" href="home_page.css">
                <link rel="stylesheet" href="home_page.css?v=1.3"> -->
                <link rel="stylesheet" href="profile.css">
		        <script src="profile.js" defer></script>
			</head>
		</head>

    <body>
        <div id="overlay" class="hidden">

        </div>
        <header class = "header">
            <div class = "header-items">
                <div id = "header-items-logo">
                    <div id = "header-items-logo-container">
                        <img src = "images/Spotify.png">
                    </div>
                </div>
            <nav id = "header-items-navbar">
                <div id = "header-items-navbar-flex">
                        <a id = "header-items-navbar-flex-Assistenza" href="">Assistenza</a>
                        <a id = "header-items-navbar-flex-Scarica" href="">Scarica</a>
                        <div>|</div>
                </div>
            </nav>
            <div id = "header-items-navbar-utente">
                    <a href = "profile.php"> 
                        <?php
                            echo $infoUtente["username"];
                        ?>
                    </a>
                    <div id = "header-items-navbar-utente-icon"> 
                            <a id = "iconjs" href=""><svg id="svg_icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                            </svg></a>
                    </div>
            </div>
            <div class = "generateMenujs"></div>
        </header>
        
        <section class = "mainSection">
            <section class = "sinistra">
                <div id = "sinistra-header">
                    <h1>La tua libreria</h1>
                    <a id = "sinistra-header-crea" href = "">
                        Crea Playlist
                    </a>
                </div>
                <div id = "LibreriaContainer">
                    <a href = "" id = "LibreriaContainer-BraniPiaciuti">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="red">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                            2 6.01 4.01 4 6.5 4 
                            c1.74 0 3.41 1.01 4.13 2.44 
                            C11.09 5.01 12.76 4 14.5 4 
                            16.99 4 19 6.01 19 8.5 
                            c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <div id = "LibreriaContainer-BraniPiaciuti-didascalia">
                            <span>Brani che ti piacciono</span>
                            <span id = "numBraniPiaciuti"></span>
                        </div>
                    </a>
                     <a href = "" id = "LibreriaContainer-AlbumPiaciuti">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4a2 2 0 0 0-2 2v16l8-5 8 5V6a2 2 0 0 0-2-2H6z"/>
                        </svg>
                        <div id = "LibreriaContainer-AlbumPiaciuti-didascalia">
                            <span>Album che hai salvato</span>
                            <span id = "numAlbumSalvati"></span>
                        </div>
                    </a>
                    <a href = "" id = "LibreriaContainer-ArtistiSeguiti">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="#000000">
                            <circle cx="9" cy="7" r="4" />
                            <path d="M2 20c0-3.31 2.69-6 6-6s6 2.69 6 6v1H2v-1z" />
                            <path d="M18 8v-2h-2V4h2V2h2v2h2v2h-2v2h-2z"/>
                            </svg>
                        <div id = "LibreriaContainer-ArtistiSeguiti-didascalia">
                            <span>Segui già</span>
                            <span id = "numArtistiSeguiti"></span>
                        </div>
                    </a>
                    <div class = "LibreriaContainer-elencoPlaylist">
                        <div id = "LibreriaContainer-elencoPlaylist-header">
                            <h1></h1>
                        </div>
                    </div>
                </div>
            </section>
            <section class = "destra">
                <div id = "destra-header">
                    <div id = "destra-header-icona">
                        <a id = "iconjs" href=""><svg id="svg_icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                        </svg></a>
                    </div>
                    <div id = "destra-header-utente">
                        <h3>Profilo</h3>
                        <h1>
                            <?php 
                                $name = $infoUtente["Nome"];
                                $surname = $infoUtente["Cognome"];
                                echo "$name $surname"; 
                            ?>
                        </h1>
                        <a href = ""></a>
                    </div>
                </div>
                <section id = "ArtistiTopMese">
                </section>
                <section id = "BraniTopMese">
                </section>
            </section>
            <section class = "BraniPiaciuti">
            </section>
            <section class = "AlbumSalvati"></section>
            <section class = "ArtistiSeguiti"></section>
            <section class = "CreaPlaylist"></section>
            <section class = "Playlist"></section>
        </section>
        <footer>
            <div id = "footer-flex-container">
                <div id = "footer-flex-container-box">
                    <div id = "footer-flex-container-box-Alto">
                        <div id = "footer-flex-container-box-Alto-LogoContainer">
                            <div id = "footer-flex-container-box-Alto-LogoContainer-Logo">
                                <a href ="https://open.spotify.com/intl-it/">
                                    <img src = "images/Spotify.png">
                                </a>
                            </div>
                        </div>
                        <div id = "footer-flex-container-box-Alto-TableContainer">
                           <div id = "footer-flex-container-box-Alto-TableContainer-BoxColonna">
                                <div id = "footer-flex-container-box-Alto-TableContainer-BoxColonna-ContenitoreLi">
                                    <ul>
                                        <li id = "Intestazione">
                                            <p>AZIENDA</p>
                                        </li>
                                        <li>
                                            <a href = "">Chi siamo</a>
                                        </li>
                                        <li>
                                            <a href = "">Opportunità di lavoro</a>    
                                        </li>
                                        <li>
                                            <a href = "">For the Record</a>    
                                        </li>
                                    </ul>
                                </div>
                            </div>
                           <div id = "footer-flex-container-box-Alto-TableContainer-BoxColonna">
                                <div id = "footer-flex-container-box-Alto-TableContainer-BoxColonna-ContenitoreLi">
                                    <ul>
                                        <li id = "Intestazione">
                                            <p>COMMUNITY</p>
                                        </li>
                                        <li>
                                            <a href = "">Per artisti</a>
                                        </li>
                                        <li>
                                            <a href = "">Sviluppatori</a>    
                                        </li>
                                        <li>
                                            <a href = "">Pubblicità</a>    
                                        </li>
                                        <li>
                                            <a href = "">Investitori</a>    
                                        </li>
                                        <li>
                                            <a href = "">Venditori</a>    
                                        </li>
                                    </ul>
                                </div>   
                            </div>
                            <div id = "footer-flex-container-box-Alto-TableContainer-BoxColonna">
                                <div id = "footer-flex-container-box-Alto-TableContainer-BoxColonna-ContenitoreLi">
                                    <ul>
                                        <li id = "Intestazione">
                                            <p>LINK UTILI</p>
                                        </li>
                                        <li>
                                            <a href = "">Assistenza</a>
                                        </li>
                                        <li>
                                            <a href = "">Lettore Web</a>    
                                        </li>
                                        <li>
                                            <a href = "">App per cellulare<br>gratuita</a>    
                                        </li>
                                    </ul>
                                </div> 
                            </div>
                            <div id = "footer-flex-container-box-Alto-TableContainer-BoxColonna">
                                <div id = "footer-flex-container-box-Alto-TableContainer-BoxColonna-ContenitoreLi">
                                    <ul>
                                        <li id = "Intestazione">
                                            <p>PIANI SPOTIFY</p>
                                        </li>
                                        <li>
                                            <a href = "">Premium<br>Individual</a>
                                        </li>
                                        <li>
                                            <a href = "">Premium Duo</a>    
                                        </li>
                                        <li>
                                            <a href = "">Premium Family</a>    
                                        </li>
                                        <li>
                                            <a href = "">Premium Student</a>    
                                        </li>
                                        <li>
                                            <a href = "">Spotify free</a>    
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div id = "footer-flex-container-box-Alto-SocialContainer">
                            <div id = "footer-flex-container-box-Alto-SocialContainer-BoxI">
                                <a href= "https://www.instagram.com/spotify/" id = "Instagram">
                                    <img src = "images/Instagram.png">
                                </a>
                            </div>
                            <div id = "footer-flex-container-box-Alto-SocialContainer-BoxX">
                                <a href= "https://x.com/spotify" id = "X">
                                    <img src = "Images/X.png">
                                </a>
                            </div>
                            <div id = "footer-flex-container-box-Alto-SocialContainer-BoxF">
                                <a href= "https://www.facebook.com/Spotify" id = "Facebook">
                                    <img src = "Images/Facebook.png">
                                </a>
                            </div>
                        </div>
                    </div>
                    <div id = "footer-flex-container-box-Basso">
                        <div id = "footer-flex-container-box-Basso-LinkContainer">
                            <a href = "https://www.spotify.com/it/legal/end-user-agreement/">Informazioni legali</a>
                            <a href = "https://www.spotify.com/it/safetyandprivacy">Sicurezza e Centro sulla privacy</a>
                            <a href = "https://www.spotify.com/it/legal/privacy-policy/">Informativa sulla privacy</a>
                            <a href = "">Impostazioni cookie</a>
                            <a href = "https://www.spotify.com/it/legal/privacy-policy/#s3">Info annunci</a>
                            <a href = "https://www.spotify.com/it/accessibility">Accessibilità</a>
                        </div>
                        <div id = "footer-flex-container-box-Basso-CopyrightContainer">
                            <div id = "footer-flex-container-box-Basso-CopyrightContainer-Italia">
                                <a href = "https://www.spotify.com/it/select-your-country-region/">Italia</a>
                            </div>
                            <div id = "footer-flex-container-box-Basso-CopyrightContainer-Spotify">
                                <p>© 2025 Spotify AB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </body>
</html>