<?php
    require_once 'Auth.php';
    if (!$userid = checkAuth()) exit;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $image = mysqli_real_escape_string($conn, $_POST['image']);
    $numFollower = mysqli_real_escape_string($conn, $_POST['numFollower']);
    $genere = mysqli_real_escape_string($conn, $_POST['genere']);
    
    $idUtente = mysqli_real_escape_string($conn, $userid);

    $query_search_artist = "select ID from artists where Name = '$name' and Image = '$image' and Genere = '$genere'";
    $res_artist = mysqli_query($conn, $query_search_artist);

    if (mysqli_num_rows($res_artist) > 0){
        $row = mysqli_fetch_assoc($res_artist);
        $idArtist = (int)$row['ID'];
        $query_search_follow = "select Utente from usersartists where Utente = $idUtente and Artista = $idArtist";
        $res_follow = mysqli_query($conn, $query_search_follow);
        if(mysqli_num_rows($res_follow) > 0){
            $query_remove_follow = "DELETE from usersartists where Utente = $idUtente and Artista = $idArtist";
            $res_remove = mysqli_query($conn, $query_remove_follow);
            mysqli_close($conn);
            echo "Cancellazione follow effettuata";
        } else {
            $query_insert_only_follow = "INSERT into usersartists (Utente, Artista, DataSegui) values ($idUtente,  $idArtist, CURRENT_DATE)";
            mysqli_query($conn, $query_insert_only_follow);
            mysqli_close($conn);
            echo "Inserimento follow effettuato";
        }

    } else{
        $query_insert_artist = "INSERT INTO artists(Name, Image, NumFollower, Genere) VALUES('$name', '$image', $numFollower, '$genere')";
        mysqli_query($conn, $query_insert_artist);
        $newIDArtist = mysqli_insert_id($conn);

        $query_insert_follow = "INSERT into usersartists(Utente, Artista, DataSegui) values ($userid,  $newIDArtist, CURRENT_DATE)";
        mysqli_query($conn, $query_insert_follow);

        mysqli_close($conn);
        echo "Inserimento artista e follow effettuato";
    }

?>