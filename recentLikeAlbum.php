<?php
require_once 'Auth.php';
if (!$userid = checkAuth()) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

$idUtente = mysqli_real_escape_string($conn, $userid);

$query = "SELECT A.Titolo, A.NumeroTracce, A.DataRilascio, A.Image, GROUP_CONCAT(AA.artista SEPARATOR ', ') AS artisti 
        FROM album A 
        join likealbum la on A.ID = la.Album 
        JOIN artistialbum AA ON A.ID = AA.album
        where la.Utente = $userid
        GROUP BY A.ID
        order by la.DataLike DESC";
$res = mysqli_query($conn, $query);

$albums = array(); 

while ($row = mysqli_fetch_assoc($res)) {
    $albums[] = $row; 
}

header('Content-Type: application/json');
mysqli_close($conn);
echo json_encode($albums);
?>