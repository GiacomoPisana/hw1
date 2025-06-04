<?php
    require_once 'Auth.php';
    if (!$userid = checkAuth()) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

    $idUtente = mysqli_real_escape_string($conn, $userid);

    $query = "SELECT A.NAME, A.Image, A.NumFollower, A.Genere, UA.DataSegui
                FROM artists A
                join usersartists ua
                on A.ID = ua.Artista
                where ua.Utente = $userid
                order by ua.DataSegui DESC";
    $res = mysqli_query($conn, $query);

    $artists = array(); 

    while ($row = mysqli_fetch_assoc($res)) {
        $artists[] = $row; 
    }

    header('Content-Type: application/json');
    mysqli_close($conn);
    echo json_encode($artists);
?>