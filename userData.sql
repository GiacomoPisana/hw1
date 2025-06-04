create database if not exists datiutenti;
use datiutenti;

CREATE TABLE if NOT EXISTS users (
	ID INTEGER PRIMARY KEY AUTO_INCREMENT,
	Nome VARCHAR(255) NOT null,
	Cognome VARCHAR(255) NOT null,
	username VARCHAR(255) NOT NULL unique,
	Email VARCHAR(255) NOT NULL unique,
	PASSWORD varchar(255)
) Engine = INNODB;

CREATE TABLE if NOT EXISTS album (
	ID INTEGER PRIMARY KEY AUTO_INCREMENT,
	Titolo VARCHAR(255),
	NumeroTracce INTEGER,
	DataRilascio DATE,
	Image VARCHAR(255)
	
) ENGINE = INNODB;


CREATE TABLE if NOT EXISTS ArtistiAlbum(
	album INTEGER,
	artista VARCHAR(255),
	FOREIGN KEY (album) REFERENCES album(ID),
	PRIMARY KEY(album, artista)
) ENGINE = INNODB;

CREATE TABLE if NOT EXISTS likeAlbum (
	Utente INTEGER,
	Album INTEGER,
	DataLike DATE,
	FOREIGN KEY (Utente) REFERENCES users(ID),
	FOREIGN KEY (Album) REFERENCES album(ID),
	PRIMARY KEY(Utente, Album)
) ENGINE = INNODB; 

CREATE TABLE if NOT EXISTS songs (
	ID integer PRIMARY KEY AUTO_INCREMENT,
	Titolo VARCHAR(255),
	Durata INTEGER,
	Image VARCHAR(255)
) ENGINE = INNODB;

CREATE TABLE if NOT EXISTS ArtistiSong(
	Song INTEGER,
	artista VARCHAR(255),
	FOREIGN KEY (Song) REFERENCES songs(ID),
	PRIMARY KEY(Song, artista)
) ENGINE = INNODB;

CREATE TABLE if NOT EXISTS likeSong (
	Utente INTEGER,
	Song INTEGER,
	DataLike DATE,
	FOREIGN KEY (Utente) REFERENCES users(ID),
	FOREIGN KEY (Song) REFERENCES songs(ID),
	PRIMARY KEY(Utente, Song)
) ENGINE = INNODB; 

CREATE TABLE if NOT EXISTS artists (
	ID INTEGER PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(255),
	Image VARCHAR(255),
	NumFollower INTEGER,
	Genere VARCHAR(255)
) ENGINE = INNODB;

-- DROP TABLE if EXISTS artistisong;

-- SELECT ID from Album where Titolo = "Persona" and NumeroTracce = 17 and DataRilascio = '2020-03-27' and Image = 'https://i.scdn.co/image/ab67616d0000b2733661bb9255ab380bef12d981';

CREATE TABLE if NOT EXISTS usersArtists (
	Utente INTEGER,
	Artista INTEGER,
	DataSegui DATE,
	FOREIGN KEY (Utente) REFERENCES users(ID),
	FOREIGN KEY (Artista) REFERENCES artists(ID),
	PRIMARY KEY (Utente, Artista)
) ENGINE = INNODB;


CREATE TABLE if NOT EXISTS playlist(
	ID INTEGER PRIMARY KEY AUTO_INCREMENT,
	Nome VARCHAR(255)
) ENGINE = INNODB;

CREATE TABLE if NOT EXISTS usersPlaylist(
	Utente INTEGER,
	Playlist INTEGER,
	FOREIGN KEY (Utente) REFERENCES users(ID),
	FOREIGN KEY (Playlist) REFERENCES playlist(ID),
	PRIMARY KEY(Utente, Playlist)
)ENGINE = INNOdb;

CREATE TABLE if NOT EXISTS songPlaylist (
	Song INTEGER,
	Playlist INTEGER,
	FOREIGN KEY (Song) REFERENCES songs(ID),
	FOREIGN KEY (Playlist) REFERENCES playlist(ID),
	PRIMARY KEY(Song, Playlist)
) ;

SELECT P.Nome FROM playlist P join usersplaylist UP on P.ID = UP.Playlist where UP.Utente = 1;

SELECT S.Titolo, S.Durata, S.Image
FROM songs S
JOIN songplaylist Sp ON S.ID = Sp.Song
JOIN usersplaylist UP ON Sp.Playlist = UP.Playlist
WHERE UP.Utente = 1 AND UP.Playlist = 4;


SELECT ID FROM songs WHERE Titolo = 'Bottiglie privè' and Image = 'https://i.scdn.co/image/ab67616d0000b273affffa7ab8803fca453be456' and Durata = 189867;

INSERT INTO songplaylist(Song, Playlist) VALUES (3, 4);