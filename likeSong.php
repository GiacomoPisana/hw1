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
$durata= mysqli_real_escape_string($conn, $_POST['durata']);
$image = mysqli_real_escape_string($conn, $_POST['image']);
$artists = $_POST['artisti'];
$idUtente = mysqli_real_escape_string($conn, $userid);

$query_search_song = "select ID from songs where Titolo = '$titolo' and Durata = $durata and Image = '$image'";
$res_song = mysqli_query($conn, $query_search_song);

if (mysqli_num_rows($res_song) > 0){
    $row = mysqli_fetch_assoc($res_song);
    $idSong = (int)$row['ID'];
    $query_search_like = "select Utente from likeSong where Utente = $idUtente and Song = $idSong";
    $res_like = mysqli_query($conn, $query_search_like);
    if(mysqli_num_rows($res_like) > 0){
        $query_remove_like = "delete from likeSong where Utente = $idUtente and Song = $idSong";
        $res_remove = mysqli_query($conn, $query_remove_like);
        mysqli_close($conn);
        echo "Cancellazione like effettuata";
    } else {
        $query_insert_only_like = "INSERT into likeSong (Utente, Song, DataLike) values ($idUtente,  $idSong, CURRENT_DATE)";
        mysqli_query($conn, $query_insert_only_like);
        mysqli_close($conn);
        echo "Inserimento like effettuato";

    }

} else{
    $query_insert_song = "INSERT INTO songs(Titolo, Durata, Image) VALUES('$titolo', $durata, '$image')";
    mysqli_query($conn, $query_insert_song);
    $newIDSong = mysqli_insert_id($conn);

    $query_insert_like = "INSERT into likeSong (Utente, Song, DataLike) values ($userid,  $newIDSong, CURRENT_DATE)";
    mysqli_query($conn, $query_insert_like);

    foreach($artists as $artist){
        echo "$artist";
        $query_insert_artist = "INSERT into artistisong (Song, artista) values ($newIDSong, '$artist')";
        mysqli_query($conn, $query_insert_artist);
    }

    mysqli_close($conn);
    echo "Inserimento canzone like e artisti effettuato";
}



?>