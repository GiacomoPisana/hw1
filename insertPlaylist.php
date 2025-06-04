<?php
require_once 'Auth.php';
if (!$userid = checkAuth()) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

$idUtente = mysqli_real_escape_string($conn, $userid);
$name = mysqli_real_escape_string($conn, $_POST['name']);


$query_insert_playlist = "INSERT into playlist(Nome) values ('$name')";
mysqli_query($conn, $query_insert_playlist);
$newIDPlaylist = mysqli_insert_id($conn);

$query_insert_playlistUsers = "INSERT INTO usersPlaylist(Utente, Playlist) values ($idUtente, $newIDPlaylist)";
mysqli_query($conn, $query_insert_playlistUsers);
mysqli_close($conn);
echo "Inserimento effettuato correttamente";
?>