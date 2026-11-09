CREATE TEMPORARY TABLE nuevas_peliculas LIKE peliculas;

INSERT INTO nuevas_peliculas (titulo, sinopsis, duracion_min, clasificacion, genero, poster_url) VALUES
('IT', 'Un grupo de chicos de Derry se enfrenta a Pennywise, un payaso demoníaco que se alimenta del miedo de los niños.', 135, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=IT'),
('IT Capitulo Dos', 'Veintisiete años después, el Club de los Perdedores regresa a Derry para acabar con Pennywise de una vez por todas.', 169, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=IT%20Capitulo%20Dos'),
('Terrifier', 'En Halloween, Art el Payaso acecha a dos chicas en una noche de pesadilla sangrienta.', 85, '+18', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Terrifier'),
('Terrifier 2', 'Art el Payaso regresa a Miles County y persigue a una adolescente y a su hermano menor en otra Halloween macabra.', 138, '+18', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Terrifier%202'),
('Terrifier 3', 'Art el Payaso arruina la Navidad con una ola de terror contra los sobrevivientes de su última masacre.', 125, '+18', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Terrifier%203'),
('El telefono negro', 'Un chico secuestrado por un asesino enmascarado recibe llamadas desde un teléfono desconectado que le dan la clave para escapar.', 103, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=El%20telefono%20negro'),
('El telefono negro 2', 'Finney vuelve a enfrentarse al Raptor mientras su hermana Gwen empieza a recibir llamadas y visiones perturbadoras.', 114, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=El%20telefono%20negro%202'),
('La monja', 'Un sacerdote y una novicia investigan una muerte misteriosa en una abadía de Rumania y se topan con una fuerza demoníaca.', 96, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=La%20monja'),
('La monja II', 'En 1956, un sacerdote es asesinado y la hermana Irene vuelve a enfrentarse al demonio Valak.', 110, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=La%20monja%20II'),
('El conjuro', 'Los investigadores paranormales Ed y Lorraine Warren ayudan a una familia atormentada por una presencia oscura en su granja.', 112, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=El%20conjuro'),
('El conjuro 2', 'Los Warren viajan a Londres para ayudar a una madre soltera cuya casa es acosada por un espíritu malvado.', 134, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=El%20conjuro%202'),
('El conjuro 3 El diablo me obligo', 'Los Warren investigan un caso de posesión que termina en un juicio por asesinato con una fuerza oscura detrás.', 112, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=El%20conjuro%203'),
('El conjuro 4 Ultimos ritos', 'Ed y Lorraine Warren enfrentan su último y más oscuro caso, que pone a prueba a toda su familia.', 135, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=El%20conjuro%204'),
('Annabelle', 'Una pareja es atacada por una secta satánica y una muñeca antigua se convierte en el canal de una presencia maligna.', 99, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Annabelle'),
('Annabelle 2 La creacion', 'Un fabricante de muñecas y su esposa acogen a un grupo de niñas en su casa, sin saber que ahí los espera la muñeca poseída.', 109, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Annabelle%202'),
('Annabelle vuelve a casa', 'Una noche, la muñeca Annabelle despierta a los espíritus del museo de los Warren y ataca a su hija y sus amigas.', 106, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Annabelle%203'),
('La llorona', 'Una trabajadora social investiga una muerte y se ve perseguida por la leyenda del espíritu de una madre que llora por sus hijos.', 93, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=La%20llorona'),
('Halloween', 'Cuarenta años después, Laurie Strode se prepara para el regreso de Michael Myers a Haddonfield.', 106, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Halloween'),
('Scream', 'Veinticinco años después de los crímenes originales, un nuevo Ghostface vuelve a aterrorizar a Woodsboro.', 114, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Scream'),
('Scream VI', 'Los sobrevivientes de Woodsboro se mudan a Nueva York, pero Ghostface los sigue hasta la gran ciudad.', 123, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Scream%20VI'),
('Barbie', 'Barbie sale de Barbieland al mundo real y descubre lo que significa ser humana.', 114, 'ATP', 'Comedia', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Barbie'),
('Toy Story', 'Los juguetes de Andy cobran vida cuando no hay nadie, hasta que un nuevo astronauta amenaza el lugar de Woody.', 81, 'ATP', 'Animación', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Toy%20Story'),
('Get Out', 'Un joven visita a la familia de su novia y descubre un secreto aterrador detrás de su amabilidad.', 104, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Get%20Out'),
('Sonrie', 'Una psiquiatra empieza a ser acosada por una entidad que se manifiesta a través de sonrisas inquietantes.', 115, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Sonrie'),
('Sonrie 2', 'Una estrella del pop en plena gira se ve atormentada por la misma entidad macabra que se esconde tras una sonrisa.', 127, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Sonrie%202'),
('Barbarian', 'Una mujer llega a su alquiler y encuentra a un desconocido ya instalado; en el sótano hay algo mucho peor.', 102, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Barbarian'),
('Habla conmigo', 'Un grupo de amigos descubre cómo invocar espíritus con una mano embalsamada, hasta que el juego se sale de control.', 95, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Habla%20conmigo'),
('Longlegs', 'Una agente del FBI investiga una serie de crímenes con un trasfondo oculto y un asesino que deja mensajes cifrados.', 101, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Longlegs'),
('Matrix', 'Un programador descubre que la realidad es una simulación y se une a la rebelión contra las máquinas.', 136, '+16', 'Ciencia ficción', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Matrix'),
('El aro', 'Una periodista investiga una cinta de video maldita que condena a morir a quien la ve en siete días.', 115, '+13', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=El%20aro'),
('Un lugar en silencio', 'Una familia sobrevive en silencio absoluto para evitar a unas criaturas que cazan por el sonido.', 90, '+13', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Un%20lugar%20en%20silencio'),
('Un lugar en silencio Parte II', 'La familia Abbott sale de su refugio y descubre que el peligro no solo viene de las criaturas.', 97, '+13', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Un%20lugar%20en%20silencio%202'),
('Avatar', 'Un ex marine se infiltra entre los Na''vi en Pandora y termina dividido entre dos mundos.', 162, '+13', 'Ciencia ficción', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Avatar'),
('La familia del futuro', 'Lewis, un huérfano inventor, viaja al futuro con un chico misterioso y conoce a una familia muy peculiar mientras intenta detener a un villano que quiere arruinarle la vida.', 95, 'ATP', 'Animación', 'https://placehold.co/300x450/1e1e1e/ffffff?text=La%20familia%20del%20futuro'),
('Grandes héroes', 'Hiro, un joven genio de la robótica, forma un equipo de superhéroes junto a Baymax, un robot sanitario, para descubrir quién está detrás de un misterioso ataque en San Fransokyo.', 102, 'ATP', 'Animación', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Grandes%20heroes'),
('Spider-Man Cruzando el Multiverso', 'Miles Morales viaja por el multiverso y se enfrenta a una sociedad de Spider-Men.', 140, 'ATP', 'Animación', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Spider-Man%20Multiverso'),
('Five Nights at Freddy''s', 'Un guardia de seguridad nocturno descubre que los animatrónicos de una pizzería abandonada cobran vida.', 109, '+13', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Five%20Nights%20at%20Freddys'),
('M3GAN', 'Una muñeca con inteligencia artificial, creada para ser la mejor amiga de una niña, empieza a protegerla de forma letal.', 102, '+13', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=M3GAN'),
('El exorcista', 'Una madre pide ayuda a dos sacerdotes cuando su hija de doce años empieza a mostrar señales de posesión demoníaca.', 122, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=El%20exorcista'),
('Shrek', 'Un ogro gruñón emprende una misión para rescatar a una princesa y recuperar su pantano.', 90, 'ATP', 'Animación', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Shrek'),
('Pecadores', 'Dos hermanos gemelos abren un bar en el Mississippi de los años 30 y una amenaza sobrenatural llega con la noche.', 137, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Pecadores'),
('Destino final Lazos de sangre', 'Una joven descubre que su familia está atrapada en una cadena de muertes inevitables y debe romper el ciclo.', 110, '+16', 'Terror', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Destino%20final'),
('Joker', 'Un comediante fracasado de Gotham se hunde en la locura y se convierte en un símbolo del caos.', 122, '+16', 'Drama', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Joker'),
('Titanic', 'Un joven artista y una chica de clase alta se enamoran a bordo del barco más famoso de la historia.', 194, '+13', 'Romance', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Titanic');

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


SELECT (SELECT COUNT(*) FROM peliculas) AS peliculas, (SELECT COUNT(*) FROM funciones) AS funciones;