<?php
    require_once 'Auth.php';
    if (!$userid = checkAuth()) exit;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

    $titolo = mysqli_real_escape_string($conn, $_POST['titolo']);
    $numTracce = mysqli_real_escape_string($conn, $_POST['numTracce']);
    $dataRilascio = mysqli_real_escape_string($conn, $_POST['dataRilascio']);
    $image = mysqli_real_escape_string($conn, $_POST['image']);
    $idUtente = mysqli_real_escape_string($conn, $userid);

    $query_search_album = "SELECT ID from Album where Titolo = '$titolo' and NumeroTracce = $numTracce and DataRilascio = '$dataRilascio' and Image = '$image'";
    $res_album = mysqli_query($conn, $query_search_album);
     
    if (mysqli_num_rows($res_album) > 0){
        $row = mysqli_fetch_assoc($res_album);
        $idAlbum = (int)$row['ID'];
        $query_search_like = "select Utente from likeAlbum where Utente = $idUtente and Album = $idAlbum";
        $res_like = mysqli_query($conn, $query_search_like);
        if(mysqli_num_rows($res_like) > 0){
            echo "NON MI PIACE PIù";
            mysqli_close($conn);
            //exit;
        } else {
            mysqli_close($conn);
            echo "MI PIACE";
        }

    } else{
        mysqli_close($conn);
        echo "MI PIACE";
    }

?>