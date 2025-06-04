<?php
require_once 'Auth.php';
if (!$userid = checkAuth()) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

$idUtente = mysqli_real_escape_string($conn, $userid);
$nomePlaylist = mysqli_real_escape_string($conn, $_POST['nomeplaylist']);
$titolo = mysqli_real_escape_string($conn, $_POST['titolo']);
$image = mysqli_real_escape_string($conn, $_POST['image']);
$durata = mysqli_real_escape_string($conn, $_POST['durata']);

$query_search_playlist = "SELECT ID from playlist where Nome = '$nomePlaylist' limit 1";
$res_playlist = mysqli_query($conn, $query_search_playlist);
$rowPlaylist = mysqli_fetch_assoc($res_playlist);
$idPlaylist = (int)$rowPlaylist['ID'];

$query_search_brano = "SELECT ID FROM songs WHERE Titolo = '$titolo' and Image = '$image' and Durata = $durata";
$res_brano = mysqli_query($conn, $query_search_brano);

if (mysqli_num_rows($res_brano) > 0){
    $row = mysqli_fetch_assoc($res_brano);
    $idBrano = (int)$row['ID'];
    $queryInsertOnPlaylist = "INSERT INTO songplaylist(Song, Playlist) values ($idBrano, $idPlaylist)";
    mysqli_query($conn, $queryInsertOnPlaylist);
    mysqli_close($conn);
    exit;
    //echo "Inserimento brano alla playlist effettuato";
} else {
    $query_insert_song = "INSERT INTO songs(Titolo, Durata, Image) VALUES('$titolo', $durata, '$image')";
    mysqli_query($conn, $query_insert_song);
    $newIDBrano = mysqli_insert_id($conn);
    $queryInsertOnPlaylist = "INSERT INTO songplaylist(Song, Playlist) values ($newIDBrano, $idPlaylist)";
    mysqli_query($conn, $queryInsertOnPlaylist);
    mysqli_close($conn);
    //echo "Inserimento brano alla playlist e all'elenco brani effettuato";
    exit;
}
?>