<?php
//script php che riceve le informazioni dell'album a cui l'utente ha messo like;
//bisogna creare una tabella album();
//e una tabella likeAlbum(
//  utente
//  album
//  foreign key (utente) references USERS
//  foreign key (ALBUM) references album;
//  primary key(utente, album);
//);

//INSERIRE UN MARGIN-TOP IN ALBUM e non marginbottom in nav altrimenti si abbassa pure il menu a tendina

require_once 'Auth.php';
if (!$userid = checkAuth()) exit;

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

$titolo = mysqli_real_escape_string($conn, $_POST['titolo']);
$numTracce = mysqli_real_escape_string($conn, $_POST['numTracce']);
$dataRilascio = mysqli_real_escape_string($conn, $_POST['dataRilascio']);
$image = mysqli_real_escape_string($conn, $_POST['image']);
$artists = $_POST['artisti'];
$idUtente = mysqli_real_escape_string($conn, $userid);

$query_search_album = "SELECT ID from Album where Titolo = '$titolo' and NumeroTracce = $numTracce and DataRilascio = '$dataRilascio' and Image = '$image'";
$res_album = mysqli_query($conn, $query_search_album);

if (mysqli_num_rows($res_album) > 0){
    $row = mysqli_fetch_assoc($res_album);
    $idAlbum = (int)$row['ID'];
    $query_search_like = "select Utente from likeAlbum where Utente = $idUtente and Album = $idAlbum";
    $res_like = mysqli_query($conn, $query_search_like);

    if(mysqli_num_rows($res_like) > 0){
        $query_remove_like = "delete from likeAlbum where Utente = $idUtente and Album = $idAlbum";
        $res_remove  = mysqli_query($conn, $query_remove_like);
        mysqli_close($conn);
        echo "Cancellazione like effettuata";
    } else {
        $query_insert_only_like = "INSERT into likeAlbum (Utente, Album, DataLike) values ($idUtente,  $idAlbum, CURRENT_DATE)";
        mysqli_query($conn, $query_insert_only_like);
        mysqli_close($conn);
        echo "Inserimento like effettuato";
    }

} else{
    $query_insert_album = "INSERT INTO album(Titolo, NumeroTracce, DataRilascio, Image) VALUES('$titolo', $numTracce, '$dataRilascio', '$image')";
    mysqli_query($conn, $query_insert_album);
    $newIDAlbum = mysqli_insert_id($conn);

    $query_insert_like = "INSERT into likeAlbum (Utente, Album, DataLike) values ($userid,  $newIDAlbum, CURRENT_DATE)";
    mysqli_query($conn, $query_insert_like);

    foreach ($artists as $artist){
        $query_insert_artist = "INSERT INTO artistiAlbum (Album, Artista) values ($newIDAlbum, '$artist')";
        mysqli_query($conn, $query_insert_artist);
    }

    mysqli_close($conn);
    echo "Inserimento album like e artisti effettuato";
}



?>