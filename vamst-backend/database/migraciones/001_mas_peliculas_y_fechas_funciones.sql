-- 001: películas adicionales, más funciones y posters reales.
-- Se puede correr más de una vez: las películas se insertan solo si faltan
-- y los posters se actualizan por título para las bases ya migradas.
SET NAMES utf8mb4;
USE vamst;

CREATE TEMPORARY TABLE nuevas_peliculas LIKE peliculas;

INSERT INTO nuevas_peliculas (titulo, sinopsis, duracion_min, clasificacion, genero, poster_url) VALUES
('IT', 'Un grupo de chicos de Derry se enfrenta a Pennywise, un payaso demoníaco que se alimenta del miedo de los niños.', 135, '+16', 'Terror', 'https://es.web.img3.acsta.net/pictures/17/04/07/12/58/197841.jpg'),
('IT Capitulo Dos', 'Veintisiete años después, el Club de los Perdedores regresa a Derry para acabar con Pennywise de una vez por todas.', 169, '+16', 'Terror', 'https://es.web.img3.acsta.net/pictures/19/07/30/09/09/0763744.jpg'),
('Terrifier', 'En Halloween, Art el Payaso acecha a dos chicas en una noche de pesadilla sangrienta.', 85, '+18', 'Terror', 'https://static.wikia.nocookie.net/doblaje/images/c/c1/Terrifier_2016Poster.png/revision/latest?cb=20241107162144&path-prefix=es'),
('Terrifier 2', 'Art el Payaso regresa a Miles County y persigue a una adolescente y a su hermano menor en otra Halloween macabra.', 138, '+18', 'Terror', 'https://i.ibb.co/Wpq38f2/Dise-o-sin-t-tulo-56.png'),
('Terrifier 3', 'Art el Payaso arruina la Navidad con una ola de terror contra los sobrevivientes de su última masacre.', 125, '+18', 'Terror', 'https://static.cinepolis.com.ar/posters/2372/w500/terrifier3-final-igposter-4x5jpg'),
('El telefono negro', 'Un chico secuestrado por un asesino enmascarado recibe llamadas desde un teléfono desconectado que le dan la clave para escapar.', 103, '+16', 'Terror', 'https://m.media-amazon.com/images/M/MV5BYmEwODM0N2QtNzA2MC00NjIyLTg1NTYtZTM1MTMzYTA2MjJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'),
('El telefono negro 2', 'Finney vuelve a enfrentarse al Raptor mientras su hermana Gwen empieza a recibir llamadas y visiones perturbadoras.', 114, '+16', 'Terror', 'https://micartelera.com.ar/images/peliculas/poster/telefononegro2_poster.jpg'),
('La monja', 'Un sacerdote y una novicia investigan una muerte misteriosa en una abadía de Rumania y se topan con una fuerza demoníaca.', 96, '+16', 'Terror', 'https://m.media-amazon.com/images/M/MV5BZjE0ZjIwZDYtN2UyNi00YTEzLWJlZjAtNWQxYjk5OWE1YjJiXkEyXkFqcGc@._V1_.jpg'),
('La monja II', 'En 1956, un sacerdote es asesinado y la hermana Irene vuelve a enfrentarse al demonio Valak.', 110, '+16', 'Terror', 'https://micartelera.com.ar/images/peliculas/poster/lamonja2-poster.jpg'),
('El conjuro', 'Los investigadores paranormales Ed y Lorraine Warren ayudan a una familia atormentada por una presencia oscura en su granja.', 112, '+16', 'Terror', 'https://m.media-amazon.com/images/M/MV5BNmQ4NWQzYjMtODU5ZS00YTRjLWJiNzctNjgyNDJiZmRkOGFjXkEyXkFqcGc@._V1_.jpg'),
('El conjuro 2', 'Los Warren viajan a Londres para ayudar a una madre soltera cuya casa es acosada por un espíritu malvado.', 134, '+16', 'Terror', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOGgl-97IN4dZSr8zaQAgP3l1o8S8pxnD-68-5SwfdWz5d0eBN41VlslawJTkvfDYG-aUAe0P4Hxl6uGkFmDqz8wKVs1VYabJMWIcwonC7mg&s=10'),
('El conjuro 3 El diablo me obligo', 'Los Warren investigan un caso de posesión que termina en un juicio por asesinato con una fuerza oscura detrás.', 112, '+16', 'Terror', 'https://www.micartelera.com.ar/images/peliculas/poster/elconjuro3.jpg'),
('El conjuro 4 Ultimos ritos', 'Ed y Lorraine Warren enfrentan su último y más oscuro caso, que pone a prueba a toda su familia.', 135, '+16', 'Terror', 'https://m.media-amazon.com/images/M/MV5BM2VmMzRkYzgtMzg2ZC00OTFkLTkwMTYtNTMxNjM2YzI1MjgyXkEyXkFqcGc@._V1_.jpg'),
('Annabelle', 'Una pareja es atacada por una secta satánica y una muñeca antigua se convierte en el canal de una presencia maligna.', 99, '+16', 'Terror', 'https://m.media-amazon.com/images/M/MV5BNjkyMDU5ZWQtZDhkOC00ZWFjLWIyM2MtZWFhMDUzNjdlNzU2XkEyXkFqcGc@._V1_.jpg'),
('Annabelle 2 La creacion', 'Un fabricante de muñecas y su esposa acogen a un grupo de niñas en su casa, sin saber que ahí los espera la muñeca poseída.', 109, '+16', 'Terror', 'https://play-lh.googleusercontent.com/wKONyw_WfA7EqovgttW-su3fU2_KzpF7i-D_SlkDCqcNfskPXI3QtwFN-pI8Dpzg3XZO'),
('Annabelle vuelve a casa', 'Una noche, la muñeca Annabelle despierta a los espíritus del museo de los Warren y ataca a su hija y sus amigas.', 106, '+16', 'Terror', 'https://media.vogue.es/photos/5d2782a1695efa000881bb80/2:3/w_2560%2Cc_limit/ANNABELLE%2520VUELVE%2520A%2520CASA%2520MAIN.jpg'),
('La llorona', 'Una trabajadora social investiga una muerte y se ve perseguida por la leyenda del espíritu de una madre que llora por sus hijos.', 93, '+16', 'Terror', 'https://labutacaweb.com/wp-content/uploads/2019/04/img_20190425_1826261501685478178174422.jpg'),
('Halloween', 'Cuarenta años después, Laurie Strode se prepara para el regreso de Michael Myers a Haddonfield.', 106, '+16', 'Terror', 'https://m.media-amazon.com/images/S/pv-target-images/e0a0bb1bf1372d7f3002a573251afab45a8e8e6bdfd0df708694c940b9c4f7d9.jpg'),
('Scream', 'Veinticinco años después de los crímenes originales, un nuevo Ghostface vuelve a aterrorizar a Woodsboro.', 114, '+16', 'Terror', 'https://play-lh.googleusercontent.com/-A9lXKoBMiWnPVgNv4vLUcGUcdMY7MLjVEAHMkMY3fhfTxGLV21fiiGlDyczw8FLq7XSAL6f5shQ7QGhAq7w=w240-h480-rw'),
('Scream VI', 'Los sobrevivientes de Woodsboro se mudan a Nueva York, pero Ghostface los sigue hasta la gran ciudad.', 123, '+16', 'Terror', 'https://i.ibb.co/9rqxs30/Dise-o-sin-t-tulo-2023-03-07-T201023-941.png'),
('Barbie', 'Barbie sale de Barbieland al mundo real y descubre lo que significa ser humana.', 114, 'ATP', 'Comedia', 'https://i.ibb.co/V30gkyW/Dise-o-sin-t-tulo-7.png'),
('Toy Story', 'Los juguetes de Andy cobran vida cuando no hay nadie, hasta que un nuevo astronauta amenaza el lugar de Woody.', 81, 'ATP', 'Animación', 'https://i.ibb.co/rZQgSDT/Dise-o-sin-t-tulo-2.png'),
('Get Out', 'Un joven visita a la familia de su novia y descubre un secreto aterrador detrás de su amabilidad.', 104, '+16', 'Terror', 'https://www.ecartelera.com/images/noticias/fotos/38000/38080/1.jpg'),
('Sonrie', 'Una psiquiatra empieza a ser acosada por una entidad que se manifiesta a través de sonrisas inquietantes.', 115, '+16', 'Terror', 'https://micartelera.com.ar/images/peliculas/poster/sonrie-nuevo-poster-en-espanol.jpg'),
('Sonrie 2', 'Una estrella del pop en plena gira se ve atormentada por la misma entidad macabra que se esconde tras una sonrisa.', 127, '+16', 'Terror', 'https://www.micartelera.com.ar/images/peliculas/poster/sonrie2-poster.jpg'),
('Barbarian', 'Una mujer llega a su alquiler y encuentra a un desconocido ya instalado; en el sótano hay algo mucho peor.', 102, '+16', 'Terror', 'https://micartelera.com.ar/images/peliculas/poster/02a_barb_domteaser_1sheet_arg.jpg_344325628.jpg'),
('Habla conmigo', 'Un grupo de amigos descubre cómo invocar espíritus con una mano embalsamada, hasta que el juego se sale de control.', 95, '+16', 'Terror', 'https://m.media-amazon.com/images/S/pv-target-images/d90dbca46f9ebcaa17b1453ec5ae1312618325d5ff2e5c6b8f536b579cd2c205.jpg'),
('Longlegs', 'Una agente del FBI investiga una serie de crímenes con un trasfondo oculto y un asesino que deja mensajes cifrados.', 101, '+16', 'Terror', 'https://hips.hearstapps.com/hmg-prod/images/longlegs-4-66433e621d2bc.jpg'),
('Matrix', 'Un programador descubre que la realidad es una simulación y se une a la rebelión contra las máquinas.', 136, '+16', 'Ciencia ficción', 'https://es.web.img3.acsta.net/medias/nmedia/18/72/16/76/20065616.jpg'),
('Happy Gilmore 2', 'Happy Gilmore vuelve al golf décadas después para ayudar a su familia, con su carácter explosivo y su inconfundible swing.', 117, '+13', 'Comedia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe_gBRGs6-MuATIxOHOvme8g380kKzzr9T5Ir-4Nh3b4DeovrvYTwqkNY&s=10'),
('Un lugar en silencio', 'Una familia sobrevive en silencio absoluto para evitar a unas criaturas que cazan por el sonido.', 90, '+13', 'Terror', 'https://labutacaweb.com/wp-content/uploads/2024/07/un-lugar-en-silencio-dia-uno-poster-colombia3143327674736915432.jpg?w=640'),
('Un lugar en silencio Parte II', 'La familia Abbott sale de su refugio y descubre que el peligro no solo viene de las criaturas.', 97, '+13', 'Terror', 'https://m.media-amazon.com/images/M/MV5BZGE5MGQ1NmMtYjIwMi00ZTZmLWFkMjMtZGIzMGQzZWE4OTNlXkEyXkFqcGc@._V1_.jpg'),
('Avatar', 'Un ex marine se infiltra entre los Na''vi en Pandora y termina dividido entre dos mundos.', 162, '+13', 'Ciencia ficción', 'https://www.ecartelera.com/carteles/1700/1762/001_m.jpg'),
('La familia del futuro', 'Lewis, un huérfano inventor, viaja al futuro con un chico misterioso y conoce a una familia muy peculiar mientras intenta detener a un villano que quiere arruinarle la vida.', 95, 'ATP', 'Animación', 'https://micartelera.com.ar/images/peliculas/poster/la_familiadelfuturo.jpg'),
('Grandes héroes', 'Hiro, un joven genio de la robótica, forma un equipo de superhéroes junto a Baymax, un robot sanitario, para descubrir quién está detrás de un misterioso ataque en San Fransokyo.', 102, 'ATP', 'Animación', 'https://m.media-amazon.com/images/S/pv-target-images/c7abeafb0dbc8bc1e315ae8b5e0fa26427a0e8a8bbc9c078c1ef381e5b4b1641.jpg'),
('Spider-Man Cruzando el Multiverso', 'Miles Morales viaja por el multiverso y se enfrenta a una sociedad de Spider-Men.', 140, 'ATP', 'Animación', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4VfUVMPv8T-fDohA5dbizTipFEh2du9KyxRYRbvR8lGVzlbUrOMGlcJs&s=10'),
('Five Nights at Freddy''s', 'Un guardia de seguridad nocturno descubre que los animatrónicos de una pizzería abandonada cobran vida.', 109, '+13', 'Terror', 'https://m.media-amazon.com/images/M/MV5BNzFkMDE2ZmEtOWMwNy00MWM2LThlNjMtZWQzNWY5MTJjZjcxXkEyXkFqcGc@._V1_.jpg'),
('Mi novio es un zombie', 'R, un zombie que no recuerda su pasado, se enamora de una chica humana y empieza a recuperar su humanidad, desafiando a los dos bandos.', 98, '+13', 'Romance', 'https://m.media-amazon.com/images/M/MV5BMzg0OTAyMmMtZjE5Zi00N2Q5LWFmYTMtYjM0ZDdiOGViOTE5XkEyXkFqcGc@._V1_.jpg'),
('El exorcista', 'Una madre pide ayuda a dos sacerdotes cuando su hija de doce años empieza a mostrar señales de posesión demoníaca.', 122, '+16', 'Terror', 'https://m.media-amazon.com/images/M/MV5BZDcyZjIzZmYtZGQ5OS00ODc2LTkzN2EtNjlmMjI2NWMxYzljXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'),
('Shrek', 'Un ogro gruñón emprende una misión para rescatar a una princesa y recuperar su pantano.', 90, 'ATP', 'Animación', 'https://static.wikia.nocookie.net/doblaje/images/6/69/Shrekban.png/revision/latest?cb=20200731225428&path-prefix=es'),
('Tierra de zombies', 'En un mundo invadido por zombies, cuatro sobrevivientes muy distintos se unen en un viaje por carretera, siguiendo sus propias reglas para mantenerse con vida.', 88, '+16', 'Comedia', 'https://m.media-amazon.com/images/M/MV5BNDUzYmMxM2MtMzkwMS00MWRhLWI4MDItZGE5YzYxY2ZlZmNiXkEyXkFqcGc@._V1_.jpg'),
('Destino final Lazos de sangre', 'Una joven descubre que su familia está atrapada en una cadena de muertes inevitables y debe romper el ciclo.', 110, '+16', 'Terror', 'https://es.web.img3.acsta.net/img/9b/98/9b98ab62cbc8ef37c708c652dc72a905.jpg'),
('Joker', 'Un comediante fracasado de Gotham se hunde en la locura y se convierte en un símbolo del caos.', 122, '+16', 'Drama', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSoJRFJH0Q_v1phA-1IMj8_vGm4zuIJcchCCX_5L4c9PSBBizkOE1W6iR3&s=10'),
('Titanic', 'Un joven artista y una chica de clase alta se enamoran a bordo del barco más famoso de la historia.', 194, '+13', 'Romance', 'https://es.web.img2.acsta.net/pictures/23/01/16/14/57/2792587.jpg');

INSERT INTO peliculas (titulo, sinopsis, duracion_min, clasificacion, genero, poster_url)
SELECT n.titulo, n.sinopsis, n.duracion_min, n.clasificacion, n.genero, n.poster_url
FROM nuevas_peliculas n
WHERE NOT EXISTS (SELECT 1 FROM peliculas p WHERE p.titulo = n.titulo)
ORDER BY n.id;

DROP TEMPORARY TABLE nuevas_peliculas;

UPDATE funciones
SET fecha_hora = '2027-11-11 20:00:00'
WHERE pelicula_id = 6 AND sala_id = 2 AND fecha_hora = '2026-11-09 20:00:00';

UPDATE funciones
SET fecha_hora = DATE_ADD(fecha_hora, INTERVAL 1 YEAR)
WHERE YEAR(fecha_hora) = 2026;


-- Posters reales. Este bloque también actualiza las películas que ya existían
-- con los posters placeholder de una corrida anterior de la migración.
UPDATE peliculas SET poster_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4IDc3tfaabaI9F5JYaz0Vp0Dyuis24mVrRxhPHdSBYH9rfXVSwoHa6WI&s=10' WHERE titulo = 'Batman';
UPDATE peliculas SET poster_url = 'https://micartelera.com.ar/images/peliculas/poster/Intensamente-2-01.jpg' WHERE titulo = 'Intensamente 2';
UPDATE peliculas SET poster_url = 'https://m.media-amazon.com/images/S/pv-target-images/d8f1c0d01186c043048b690ec2ac54d15bcbbe09b0c927f0947aa28f54d3d980.jpg' WHERE titulo = 'Duna';
UPDATE peliculas SET poster_url = 'https://www.carteleraargentina.com.ar/wp-content/uploads/2025/11/Wicked-2.webp' WHERE titulo = 'Wicked';
UPDATE peliculas SET poster_url = 'https://i.ibb.co/VttSJ3B/Dise-o-sin-t-tulo-25.png' WHERE titulo = 'Moana 2';
UPDATE peliculas SET poster_url = 'https://es.web.img3.acsta.net/img/93/23/9323a23d3967be8808ac146b4c138de3.jpg' WHERE titulo = 'Gladiador II';
UPDATE peliculas SET poster_url = 'https://es.web.img3.acsta.net/pictures/17/04/07/12/58/197841.jpg' WHERE titulo = 'IT';
UPDATE peliculas SET poster_url = 'https://es.web.img3.acsta.net/pictures/19/07/30/09/09/0763744.jpg' WHERE titulo = 'IT Capitulo Dos';
UPDATE peliculas SET poster_url = 'https://static.wikia.nocookie.net/doblaje/images/c/c1/Terrifier_2016Poster.png/revision/latest?cb=20241107162144&path-prefix=es' WHERE titulo = 'Terrifier';
UPDATE peliculas SET poster_url = 'https://i.ibb.co/Wpq38f2/Dise-o-sin-t-tulo-56.png' WHERE titulo = 'Terrifier 2';
UPDATE peliculas SET poster_url = 'https://static.cinepolis.com.ar/posters/2372/w500/terrifier3-final-igposter-4x5jpg' WHERE titulo = 'Terrifier 3';
UPDATE peliculas SET poster_url = 'https://m.media-amazon.com/images/M/MV5BYmEwODM0N2QtNzA2MC00NjIyLTg1NTYtZTM1MTMzYTA2MjJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' WHERE titulo = 'El telefono negro';
UPDATE peliculas SET poster_url = 'https://micartelera.com.ar/images/peliculas/poster/telefononegro2_poster.jpg' WHERE titulo = 'El telefono negro 2';
UPDATE peliculas SET poster_url = 'https://m.media-amazon.com/images/M/MV5BZjE0ZjIwZDYtN2UyNi00YTEzLWJlZjAtNWQxYjk5OWE1YjJiXkEyXkFqcGc@._V1_.jpg' WHERE titulo = 'La monja';
UPDATE peliculas SET poster_url = 'https://micartelera.com.ar/images/peliculas/poster/lamonja2-poster.jpg' WHERE titulo = 'La monja II';
UPDATE peliculas SET poster_url = 'https://m.media-amazon.com/images/M/MV5BNmQ4NWQzYjMtODU5ZS00YTRjLWJiNzctNjgyNDJiZmRkOGFjXkEyXkFqcGc@._V1_.jpg' WHERE titulo = 'El conjuro';
UPDATE peliculas SET poster_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOGgl-97IN4dZSr8zaQAgP3l1o8S8pxnD-68-5SwfdWz5d0eBN41VlslawJTkvfDYG-aUAe0P4Hxl6uGkFmDqz8wKVs1VYabJMWIcwonC7mg&s=10' WHERE titulo = 'El conjuro 2';
UPDATE peliculas SET poster_url = 'https://www.micartelera.com.ar/images/peliculas/poster/elconjuro3.jpg' WHERE titulo = 'El conjuro 3 El diablo me obligo';
UPDATE peliculas SET poster_url = 'https://m.media-amazon.com/images/M/MV5BM2VmMzRkYzgtMzg2ZC00OTFkLTkwMTYtNTMxNjM2YzI1MjgyXkEyXkFqcGc@._V1_.jpg' WHERE titulo = 'El conjuro 4 Ultimos ritos';
UPDATE peliculas SET poster_url = 'https://m.media-amazon.com/images/M/MV5BNjkyMDU5ZWQtZDhkOC00ZWFjLWIyM2MtZWFhMDUzNjdlNzU2XkEyXkFqcGc@._V1_.jpg' WHERE titulo = 'Annabelle';
UPDATE peliculas SET poster_url = 'https://play-lh.googleusercontent.com/wKONyw_WfA7EqovgttW-su3fU2_KzpF7i-D_SlkDCqcNfskPXI3QtwFN-pI8Dpzg3XZO' WHERE titulo = 'Annabelle 2 La creacion';
UPDATE peliculas SET poster_url = 'https://media.vogue.es/photos/5d2782a1695efa000881bb80/2:3/w_2560%2Cc_limit/ANNABELLE%2520VUELVE%2520A%2520CASA%2520MAIN.jpg' WHERE titulo = 'Annabelle vuelve a casa';
UPDATE peliculas SET poster_url = 'https://labutacaweb.com/wp-content/uploads/2019/04/img_20190425_1826261501685478178174422.jpg' WHERE titulo = 'La llorona';
UPDATE peliculas SET poster_url = 'https://m.media-amazon.com/images/S/pv-target-images/e0a0bb1bf1372d7f3002a573251afab45a8e8e6bdfd0df708694c940b9c4f7d9.jpg' WHERE titulo = 'Halloween';
UPDATE peliculas SET poster_url = 'https://play-lh.googleusercontent.com/-A9lXKoBMiWnPVgNv4vLUcGUcdMY7MLjVEAHMkMY3fhfTxGLV21fiiGlDyczw8FLq7XSAL6f5shQ7QGhAq7w=w240-h480-rw' WHERE titulo = 'Scream';
UPDATE peliculas SET poster_url = 'https://i.ibb.co/9rqxs30/Dise-o-sin-t-tulo-2023-03-07-T201023-941.png' WHERE titulo = 'Scream VI';
UPDATE peliculas SET poster_url = 'https://i.ibb.co/V30gkyW/Dise-o-sin-t-tulo-7.png' WHERE titulo = 'Barbie';
UPDATE peliculas SET poster_url = 'https://i.ibb.co/rZQgSDT/Dise-o-sin-t-tulo-2.png' WHERE titulo = 'Toy Story';
UPDATE peliculas SET poster_url = 'https://www.ecartelera.com/images/noticias/fotos/38000/38080/1.jpg' WHERE titulo = 'Get Out';
UPDATE peliculas SET poster_url = 'https://micartelera.com.ar/images/peliculas/poster/sonrie-nuevo-poster-en-espanol.jpg' WHERE titulo = 'Sonrie';
UPDATE peliculas SET poster_url = 'https://www.micartelera.com.ar/images/peliculas/poster/sonrie2-poster.jpg' WHERE titulo = 'Sonrie 2';
UPDATE peliculas SET poster_url = 'https://micartelera.com.ar/images/peliculas/poster/02a_barb_domteaser_1sheet_arg.jpg_344325628.jpg' WHERE titulo = 'Barbarian';
UPDATE peliculas SET poster_url = 'https://m.media-amazon.com/images/S/pv-target-images/d90dbca46f9ebcaa17b1453ec5ae1312618325d5ff2e5c6b8f536b579cd2c205.jpg' WHERE titulo = 'Habla conmigo';
UPDATE peliculas SET poster_url = 'https://hips.hearstapps.com/hmg-prod/images/longlegs-4-66433e621d2bc.jpg' WHERE titulo = 'Longlegs';
UPDATE peliculas SET poster_url = 'https://es.web.img3.acsta.net/medias/nmedia/18/72/16/76/20065616.jpg' WHERE titulo = 'Matrix';
UPDATE peliculas SET poster_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe_gBRGs6-MuATIxOHOvme8g380kKzzr9T5Ir-4Nh3b4DeovrvYTwqkNY&s=10' WHERE titulo = 'Happy Gilmore 2';
UPDATE peliculas SET poster_url = 'https://labutacaweb.com/wp-content/uploads/2024/07/un-lugar-en-silencio-dia-uno-poster-colombia3143327674736915432.jpg?w=640' WHERE titulo = 'Un lugar en silencio';
UPDATE peliculas SET poster_url = 'https://m.media-amazon.com/images/M/MV5BZGE5MGQ1NmMtYjIwMi00ZTZmLWFkMjMtZGIzMGQzZWE4OTNlXkEyXkFqcGc@._V1_.jpg' WHERE titulo = 'Un lugar en silencio Parte II';
UPDATE peliculas SET poster_url = 'https://www.ecartelera.com/carteles/1700/1762/001_m.jpg' WHERE titulo = 'Avatar';
UPDATE peliculas SET poster_url = 'https://micartelera.com.ar/images/peliculas/poster/la_familiadelfuturo.jpg' WHERE titulo = 'La familia del futuro';
UPDATE peliculas SET poster_url = 'https://m.media-amazon.com/images/S/pv-target-images/c7abeafb0dbc8bc1e315ae8b5e0fa26427a0e8a8bbc9c078c1ef381e5b4b1641.jpg' WHERE titulo = 'Grandes héroes';
UPDATE peliculas SET poster_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4VfUVMPv8T-fDohA5dbizTipFEh2du9KyxRYRbvR8lGVzlbUrOMGlcJs&s=10' WHERE titulo = 'Spider-Man Cruzando el Multiverso';
UPDATE peliculas SET poster_url = 'https://m.media-amazon.com/images/M/MV5BNzFkMDE2ZmEtOWMwNy00MWM2LThlNjMtZWQzNWY5MTJjZjcxXkEyXkFqcGc@._V1_.jpg' WHERE titulo = 'Five Nights at Freddy''s';
UPDATE peliculas SET poster_url = 'https://m.media-amazon.com/images/M/MV5BMzg0OTAyMmMtZjE5Zi00N2Q5LWFmYTMtYjM0ZDdiOGViOTE5XkEyXkFqcGc@._V1_.jpg' WHERE titulo = 'Mi novio es un zombie';
UPDATE peliculas SET poster_url = 'https://m.media-amazon.com/images/M/MV5BZDcyZjIzZmYtZGQ5OS00ODc2LTkzN2EtNjlmMjI2NWMxYzljXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' WHERE titulo = 'El exorcista';
UPDATE peliculas SET poster_url = 'https://static.wikia.nocookie.net/doblaje/images/6/69/Shrekban.png/revision/latest?cb=20200731225428&path-prefix=es' WHERE titulo = 'Shrek';
UPDATE peliculas SET poster_url = 'https://m.media-amazon.com/images/M/MV5BNDUzYmMxM2MtMzkwMS00MWRhLWI4MDItZGE5YzYxY2ZlZmNiXkEyXkFqcGc@._V1_.jpg' WHERE titulo = 'Tierra de zombies';
UPDATE peliculas SET poster_url = 'https://es.web.img3.acsta.net/img/9b/98/9b98ab62cbc8ef37c708c652dc72a905.jpg' WHERE titulo = 'Destino final Lazos de sangre';
UPDATE peliculas SET poster_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSoJRFJH0Q_v1phA-1IMj8_vGm4zuIJcchCCX_5L4c9PSBBizkOE1W6iR3&s=10' WHERE titulo = 'Joker';
UPDATE peliculas SET poster_url = 'https://es.web.img2.acsta.net/pictures/23/01/16/14/57/2792587.jpg' WHERE titulo = 'Titanic';

SELECT (SELECT COUNT(*) FROM peliculas) AS peliculas,
       (SELECT COUNT(*) FROM peliculas WHERE poster_url LIKE 'https://placehold.co/%') AS posters_pendientes,
       (SELECT COUNT(*) FROM funciones) AS funciones;
