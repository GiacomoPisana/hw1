<?php

    /*echo "sono l'ultimo php aggiornato";
    die();*/
    include 'auth.php';
    if (checkAuth()) {
        header('Location: home_page.php');
        exit;
    }

    if (!empty($_POST["username"]) && !empty($_POST["password"]) )
    {
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        $username = mysqli_real_escape_string($conn, $_POST['username']);


        $query = "SELECT * FROM users WHERE username = '".$username."'";

        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

        
        if (mysqli_num_rows($res) > 0) {
            $entry = mysqli_fetch_assoc($res);
            $password = $entry["PASSWORD"];
            if (password_verify($_POST['password'], $password)) {
                session_regenerate_id(true);
                $_SESSION["_agora_username"] = $entry['username'];
                $_SESSION["_agora_user_id"] = $entry['ID'];
                mysqli_free_result($res);
                mysqli_close($conn);
                header("Location: home_page.php");
                exit;
            }
        }
        $error = "Username e/o password errati.";
    }
    else if (isset($_POST["username"]) || isset($_POST["password"])) {
        $error = "Inserisci username e password.";
    }

?>

<html>
    <head>
        <link rel='stylesheet' href='Login.css'>
        <script src="Login.js" defer></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Accedi a Spotify Premium (IT)</title>
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
                    <h1>Accedi a Spotify Premium</h1>
                    <h2>Inserisci le tue credenziali</h2>
                </div>
                <div id = "boxLogin-flexContainer">
                    <label id = "labelUserLogin">User Login</label>
                    <main class="login">
                        <section class="main">
                        <?php
                        if (isset($error)) {
                            echo "<p class='error'>$error</p>";
                        }
                        ?>
                            <form name='login' method='post'>
                        
                                <div class="username">
                                    <label for='username'>Username</label>
                                    <input type='text' name='username' <?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?>>
                                </div>
                                <div class="password">
                                    <label for='password'>Password</label>
                                    <input type='password' name='password' <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?>>
                                </div>
                                <div class="submit-container">
                                    <div class="login-btn">
                                        <input type='submit' value="ACCEDI">
                                    </div>
                                </div>
                                <div id = "flex-container-all-registrati">
                                    <p>Non hai un account? Clicca su
                                        <a href="Signup.php">iscriviti</a>
                                        per avere un account.
                                    </p>
                                </div>
                            </form>
                        </section>
                    </main>
                    
                </div>
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