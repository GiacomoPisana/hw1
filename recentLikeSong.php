<?php
require_once 'Auth.php';
if (!$userid = checkAuth()) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

$idUtente = mysqli_real_escape_string($conn, $userid);

$query = "SELECT 
    S.Titolo, 
    S.Durata, 
    S.Image, 
    GROUP_CONCAT(AAS.artista SEPARATOR ', ') AS artisti
    FROM songs S
    JOIN likesong ls ON S.ID = ls.Song 
    JOIN artistisong AAS ON S.ID = AAS.Song
    WHERE ls.Utente = $idUtente
    GROUP BY S.ID
    ORDER BY ls.DataLike DESC";
$res = mysqli_query($conn, $query);

$songs = array(); 

while ($row = mysqli_fetch_assoc($res)) {
    $songs[] = $row; 
}

header('Content-Type: application/json');
mysqli_close($conn);
echo json_encode($songs);
?>