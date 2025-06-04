<?php
require_once 'Auth.php';
if (!$userid = checkAuth()) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));
$songID = mysqli_real_escape_string($conn, $_POST['song']);

$idUtente = mysqli_real_escape_string($conn, $userid);

$query = "SELECT AAS.artista FROM artistisong AAS where AAS.Song = $songID";
$res = mysqli_query($conn, $query);

$artists = array(); 

while ($row = mysqli_fetch_assoc($res)) {
    $artists[] = $row; 
}

header('Content-Type: application/json');
mysqli_close($conn);
echo json_encode($artists);
?>