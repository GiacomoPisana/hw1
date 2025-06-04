<?php
    require_once 'Auth.php';
    if (!$userid = checkAuth()) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

    $idUtente = mysqli_real_escape_string($conn, $userid);
    $playlists = array();

    $query = "SELECT P.Nome, P.ID FROM playlist P join usersplaylist UP on P.ID = UP.Playlist where UP.Utente = $idUtente";

    $res = mysqli_query($conn, $query);

    while ($row = mysqli_fetch_assoc($res)) {
        $playlists[] = $row; 
    }

    header('Content-Type: application/json');
    mysqli_close($conn);
    echo json_encode($playlists);

?>