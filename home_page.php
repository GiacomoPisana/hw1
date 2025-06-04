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
				<title>Spotify - Lettore Musica Web</title>
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link href="https://fonts.googleapis.com/css?family=Lora:400,400i|Open+Sans:400,700" rel="stylesheet">
				<link rel="stylesheet" href="home_page.css">
                <link rel="stylesheet" href="home_page.css?v=1.3">
				<script src="home_page_1.js" defer></script>
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
                 <form id = "Ricerca-flex-container-box-Barra">
					<div id = "Ricerca-flex-container-box-Barra-svg">
						<svg viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10.12 4.14a5.99 5.99 0 1 0 0 11.98 5.99 5.99 0 0 0 0-11.98m-7.49 5.99a7.49 7.49 0 1 1 13.299 4.728L21.37 20.3l-1.06 1.061-5.44-5.44A7.49 7.49 0 0 1 2.63 10.13"></path>
							</svg>
					</div>
					<div id = "Ricerca-flex-container-box-Barra-testo">
						Inserisci un album, un artista o una canzone...
						<input type = "text" id = "Ricerca-flex-container-box-Barra-testo-input">
						<select id="Ricerca-flex-container-box-Barra-testo-select">
						    <option value="brano">Brano</option>
							<option value="album">Album</option>
							<option value="artista">Artista</option>
						</select>
						<input type = "submit" id = "Ricerca-flex-container-box-Barra-testo-submit" value = "Naviga">
					</div>
                 </form>
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
            </nav>
        </header>
            
			<section class = "mainSection">
                <div id = "generateMenujs"></div>
                <section class = "creatoPerTe">
                    <div id = "creatoPerTeContainer">
                        <div id = "creatoPerTeContainer-header">
                            <h1>
                                Creato per te
                                <?php
                                    $name = $infoUtente["Nome"];
                                    $surname = $infoUtente["Cognome"];

                                    echo "$name $surname";
                                ?>
                            </h1>
                            <h2>
                                Recentemente ti è piaciuto
                            </h2>
                        </div>
                        <div class = "BraniPiaciuti">
                        </div>
                        <div class = "AlbumPiaciuti">
                        </div>
                        <div class = "ArtistiSeguiti">
                        </div>
                    </div>
                </section>
                <section class = "close-button">
                </section>
				<section id = "Album-view">
				</section>
				<section id = "Brano-view">
				</section>
				<section id = "Artista-view">
				</section>
				<section class = "Ricerca">
					<div id = "Ricerca-flex-container">
						<div id = "Ricerca-flex-container-box">
							<form id = "Ricerca-flex-container-box-Barra-Mobile">
								<div id = "Ricerca-flex-container-box-Barra-svg_mobile">
									<svg viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M10.12 4.14a5.99 5.99 0 1 0 0 11.98 5.99 5.99 0 0 0 0-11.98m-7.49 5.99a7.49 7.49 0 1 1 13.299 4.728L21.37 20.3l-1.06 1.061-5.44-5.44A7.49 7.49 0 0 1 2.63 10.13"></path>
									</svg>
								</div>
								<div id = "Ricerca-flex-container-box-Barra-testo_mobile">
									
									<input type = "text" id = "Ricerca-flex-container-box-Barra-testo-input_mobile">
									<select id="Ricerca-flex-container-box-Barra-testo-select_mobile">
										<option value="brano">Brano</option>
										<option value="album">Album</option>
										<option value="artista">Artista</option>
									  </select>
									<input type = "submit" id = "Ricerca-flex-container-box-Barra-testo-submit_mobile" value = "Naviga">
								</div>
							</form>
						</div>
					</div>
                </section>
			    <section class = "Classifiche">
					<div id = "Classifiche-flex-container">
						<div id = "Classifiche-flex-container-boxC">
							<div id = "Classifiche-flex-container-box-Header">
								<h1>Ecco alcune delle classifiche che potrai visualizzare su Spotify</h1>
								<h2>Scopri le canzoni più ascoltate nel mondo</h2>
								<h3>Solo se ti abboni potrai visualizzare tutte le classifiche. Inoltre puoi ottenere le tue classifiche personali.</h3>
							</div>
							<div id = "Classifiche-flex-container-box-Buttons">
								<form id = "Classifiche-flex-container-box">
									<input type = "submit" id = "Classifiche-flex-container-box-submit" value = "">
								</form>
								<form id = "Classifiche-flex-container-box_1">
									<input type = "submit" id = "Classifiche-flex-container-box-submit_1" value = "">
								</form>
							</div>
						</div>
					</div> 
				</section>
                <section class = "ClassificheByJs">
                </section>
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