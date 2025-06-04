<?php
    require_once 'Auth.php';
    if (!$userid = checkAuth()) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));
    $albumID = mysqli_real_escape_string($conn, $_POST['album']);

    $idUtente = mysqli_real_escape_string($conn, $userid);

    $query = "SELECT AAA.artista FROM artistialbum AAA where AAA.album = $albumID";
    $res = mysqli_query($conn, $query);

    $artists = array(); 

    while ($row = mysqli_fetch_assoc($res)) {
        $artists[] = $row; 
    }
    
    mysqli_close($conn);
    echo json_encode($artists);
?>