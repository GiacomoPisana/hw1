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
        $query_search_follow = "SELECT Utente from usersartists where Utente = $idUtente and Artista = $idArtist";
        $res_follow = mysqli_query($conn, $query_search_follow);
        if(mysqli_num_rows($res_follow) > 0){
            mysqli_close($conn);
            echo "NON SEGUIRE PIù";
        } else {
            mysqli_close($conn);
            echo "SEGUI";
        }

    } else{
        mysqli_close($conn);
        echo "SEGUI";
    }

?>