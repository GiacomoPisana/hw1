<?php
    require_once 'Auth.php';
    if (!$userid = checkAuth()) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

    $idUtente = mysqli_real_escape_string($conn, $userid);
    $idPlaylist =mysqli_real_escape_string($conn, $_POST['id']);
    $brani = array();

    $query = "SELECT P.Nome, S.Titolo, S.Durata, S.Image
        FROM songs S
        JOIN songplaylist Sp ON S.ID = Sp.Song
        JOIN usersplaylist UP ON Sp.Playlist = UP.Playlist
        join playlist P on Up.Playlist = P.ID
        WHERE UP.Utente = $idUtente AND UP.Playlist = $idPlaylist";

    $res = mysqli_query($conn, $query);

    while ($row = mysqli_fetch_assoc($res)) {
        $brani[] = $row; 
    }

    header('Content-Type: application/json');
    mysqli_close($conn);
    echo json_encode($brani);

?>