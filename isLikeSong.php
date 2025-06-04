<?php
    require_once 'Auth.php';
if (!$userid = checkAuth()) exit;

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

$titolo = mysqli_real_escape_string($conn, $_POST['titolo']);
$durata= mysqli_real_escape_string($conn, $_POST['durata']);
$image = mysqli_real_escape_string($conn, $_POST['image']);
$artist = array();
$idUtente = mysqli_real_escape_string($conn, $userid);

$query_search_song = "select ID from songs where Titolo = '$titolo' and Durata = $durata and Image = '$image'";
$res_song = mysqli_query($conn, $query_search_song);

if (mysqli_num_rows($res_song) > 0){
    $row = mysqli_fetch_assoc($res_song);
    $idSong = (int)$row['ID'];
    $query_search_like = "select Utente from likeSong where Utente = $idUtente and Song = $idSong";
    $res_like = mysqli_query($conn, $query_search_like);
    if(mysqli_num_rows($res_like) > 0){
        echo "NON MI PIACE PIù";
        mysqli_close($conn);
        exit;
    } else {
        mysqli_close($conn);
        echo "MI PIACE";
    }

} else{
    mysqli_close($conn);
    echo "MI PIACE";
}

?>