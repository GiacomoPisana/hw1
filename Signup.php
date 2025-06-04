<?php
    require_once 'auth.php';

    if (checkAuth()) {
        header("Location: home_page.php");
        exit;
    }   

    if (!empty($_POST["username"]) && !empty($_POST["password"]) && !empty($_POST["email"]) && !empty($_POST["name"]) && 
        !empty($_POST["surname"]) && !empty($_POST["confirm_password"]) && !empty($_POST["allow"]))
    {
        $error = array();
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        
        if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])) {
            $error[] = "Username non valido";
        } else {
            $username = mysqli_real_escape_string($conn, $_POST['username']);
            $query = "SELECT username FROM users WHERE username = '$username'";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Username già utilizzato";
            }
        }

        if (strlen($_POST["password"]) < 8) {
            $error[] = "Caratteri password insufficienti";
        } 

        if (strcmp($_POST["password"], $_POST["confirm_password"]) != 0) {
            $error[] = "Le password non coincidono";
        }

        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $error[] = "Email non valida";
        } else {
            $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
            $res = mysqli_query($conn, "SELECT email FROM users WHERE email = '$email'");
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Email già utilizzata";
            }
        }



        if (count($error) == 0) {
            $name = mysqli_real_escape_string($conn, $_POST['name']);
            $surname = mysqli_real_escape_string($conn, $_POST['surname']);

            $password = mysqli_real_escape_string($conn, $_POST['password']);
            $password = password_hash($password, PASSWORD_BCRYPT);

            $query = "INSERT INTO users(Nome, Cognome, username, Email, PASSWORD) VALUES('$name', '$surname', '$username', '$email','$password')";
            
            if (mysqli_query($conn, $query)) {
                $_SESSION["_agora_username"] = $_POST["username"];
                $_SESSION["_agora_user_id"] = mysqli_insert_id($conn);
                mysqli_close($conn);
                header("Location: home_page.php");
                exit;
            } else {
                $error[] = "Errore di connessione al Database";
            }
        }

        mysqli_close($conn);
    }
    else if (isset($_POST["username"])) {
        $error = array("Riempi tutti i campi");
    }

?>

<html>
    <head>
        <link rel='stylesheet' href='Signup.css'>
        <script src="Signup.js" defer></script>
        <script src="DynamicPremium.js" defer></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Registrati a Spotify Premium (IT)</title>
    </head>

    <body>
        <body>
        <header class = "header">
            <div class = "header-items">
                <div id = "header-items-logo">
                    <div id = "header-items-logo-container">
                        <img src = "images/Spotify.png">
                    </div>
                </div>

            <nav id = "header-items-navbar">
                <div id = "header-items-navbar-flex">
                    <a id = "header-items-navbar-flex-Premium"href="">Premium</a>
                    <a id = "header-items-navbar-flex-Assistenza" href="">Assistenza</a>
                    <a id = "header-items-navbar-flex-Scarica" href="">Scarica</a>
                </div>
                <div class = "dynamicPremium">
                    <div id = "dynamicPremium-boxI">
                        <a href="">
                            <h1>Premium Individual</h1>
                            <h2>1 account - Per una persona.</h2>
                        </a>
                    </div>
                    <div id = "dynamicPremium-boxD">
                        <a href="">
                            <h1>Premium Duo</h1>
                            <h2>2 account - Per due persone che vivono insieme.</h2>
                        </a>
                    </div>
                    <div id = "dynamicPremium-boxF">
                        <a href="">
                            <h1>Premium Family</h1>
                            <h2>6 account - Per i membri della famiglia che vivono sotto lo stesso tetto.</h2>
                        </a>
                    </div>
                    <div id = "dynamicPremium-boxS">
                        <a href="">
                            <h1>Premium Student</h1>
                            <h2>1 account - Sconto per studenti idonei.</h2>
                        </a>
                    </div>
                </div>
            </nav>
        </header>

        <section class = "mainSection">
            <div id = "flex-container-all">
                <div id = "header-flex-container">
                    <h1>Registrati a Spotify Premium</h1>
                    <h2>Inserisci le tue credenziali</h2>
                </div>
                <div id = "boxSignup-flexContainer">
                    <!--<label id = "labelUserSignup">User Signup</label> -->
                    <form id="formSignup" name="signup" method="post">
  <div class="names">
    <div class="name">
      <label for="name">Nome</label>
      <input type="text" name="name" <?php if (isset($_POST["name"])) echo "value=".$_POST["name"]; ?>>
      <div><img src="./images/close.svg"/><span>Devi inserire il tuo nome</span></div>
    </div>

    <div class="surname">
      <label for="surname">Cognome</label>
      <input type="text" name="surname" <?php if (isset($_POST["surname"])) echo "value=".$_POST["surname"]; ?>>
      <div><img src="./images/close.svg"/><span>Devi inserire il tuo cognome</span></div>
    </div>

    <div class="username">
      <label for="username">Nome utente</label>
      <input type="text" name="username" <?php if (isset($_POST["username"])) echo "value=".$_POST["username"]; ?>>
      <div><img src="./images/close.svg"/><span>Nome utente non disponibile</span></div>
    </div>

    <div class="email">
      <label for="email">Email</label>
      <input type="email" name="email" <?php if (isset($_POST["email"])) echo "value=".$_POST["email"]; ?>>
      <div><img src="./images/close.svg"/><span>Indirizzo email non valido</span></div>
    </div>

    <div class="password">
      <label for="password">Password</label>
      <input type="password" name="password" <?php if (isset($_POST["password"])) echo "value=".$_POST["password"]; ?>>
      <div><img src="./images/close.svg"/><span>Inserisci almeno 8 caratteri</span></div>
    </div>

    <div class="confirm_password">
      <label for="confirm_password">Conferma Password</label>
      <input type="password" name="confirm_password" <?php if (isset($_POST["confirm_password"])) echo "value=".$_POST["confirm_password"]; ?>>
      <div><img src="./images/close.svg"/><span>Le password non coincidono</span></div>
    </div>

    <div class="allow"> 
      <input type="checkbox" name="allow" value="1" <?php if (isset($_POST["allow"])) echo $_POST["allow"] ? "checked" : ""; ?>>
      <label for="allow">Accetto i termini e condizioni d'uso di Spotify.</label>
    </div>

    <?php if (isset($error)) {
        foreach ($error as $err) {
            echo "<div class='errorj'><img src='./images/close.svg'/><span>$err</span></div>";
        }
    } ?>

    <div class="submit">
      <input type="submit" value="Registrati" id="submit">
    </div>	

    <div id="flex-container-all-accedi">
      <p>Hai già un account? Clicca su <a href="login.php">accedi</a> per accedere al tuo account.</p>
    </div>
  </div>
</form>
                </div>
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
		</header>
    </body>
</html>