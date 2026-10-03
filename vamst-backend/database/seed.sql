-- Datos de ejemplo para no arrancar con la base vacía.
-- Correr DESPUÉS de schema.sql.

USE vamst;

INSERT INTO peliculas (titulo, sinopsis, duracion_min, clasificacion, genero, poster_url) VALUES
('Ejemplo: Título de película', 'Sinopsis de ejemplo...', 120, 'PG-13', 'Acción', 'https://.../poster1.jpg');

INSERT INTO salas (nombre, formato, filas, columnas) VALUES
('Sala 1', '2D', 8, 10);

-- TODO: agregar asientos de la Sala 1 (podés generarlos con un loop
-- en un script aparte si son muchos, en vez de escribirlos a mano).

INSERT INTO funciones (pelicula_id, sala_id, fecha_hora, formato, precio_base) VALUES
(1, 1, '2026-10-01 20:00:00', '2D', 1500.00);

INSERT INTO productos_candy (nombre, categoria, precio, stock) VALUES
('Combo Pochoclo + Gaseosa', 'combos', 4500.00, 100);
