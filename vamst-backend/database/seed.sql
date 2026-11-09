SET NAMES utf8mb4;
USE vamst;

INSERT INTO peliculas (titulo, sinopsis, duracion_min, clasificacion, genero, poster_url, estado) VALUES
('Batman', 'El caballero oscuro vuelve a Gotham para enfrentar una nueva amenaza que pone en jaque a la ciudad.', 176, '+13', 'Acción', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Batman', 'estreno'),
('Intensamente 2', 'Riley crece y nuevas emociones llegan a su cabeza, revolucionando todo lo que conocía.', 96, 'ATP', 'Animación', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Intensamente%202', 'estreno'),
('Duna', 'Paul Atreides se une a los Fremen para vengar a su familia y evitar un futuro terrible que solo él puede prever.', 166, '+13', 'Ciencia ficción', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Duna', 'estreno'),
('Wicked', 'La historia no contada de las brujas de Oz: una amistad improbable entre Elphaba y Glinda.', 160, 'ATP', 'Musical', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Wicked', 'estreno'),
('Moana 2', 'Moana vuelve a zarpar junto a Maui y una nueva tripulación para conectar islas perdidas.', 100, 'ATP', 'Animación', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Moana%202', 'estreno'),
('Gladiador II', 'Lucio debe entrar al Coliseo para devolver la gloria de Roma a su pueblo y enfrentar a un tirano.', 148, '+16', 'Acción', 'https://placehold.co/300x450/1e1e1e/ffffff?text=Gladiador%20II', 'estreno');

INSERT INTO salas (nombre, formato, filas, columnas) VALUES
('Sala 1', '2D', 5, 8),
('Sala 2', '2D', 5, 8);

INSERT INTO asientos (sala_id, fila, numero, tipo) VALUES
(1, 'A', 1, 'comun'),
(1, 'A', 2, 'comun'),
(1, 'A', 3, 'comun'),
(1, 'A', 4, 'comun'),
(1, 'A', 5, 'comun'),
(1, 'A', 6, 'comun'),
(1, 'A', 7, 'comun'),
(1, 'A', 8, 'comun'),
(1, 'B', 1, 'comun'),
(1, 'B', 2, 'comun'),
(1, 'B', 3, 'comun'),
(1, 'B', 4, 'comun'),
(1, 'B', 5, 'comun'),
(1, 'B', 6, 'comun'),
(1, 'B', 7, 'comun'),
(1, 'B', 8, 'comun'),
(1, 'C', 1, 'accesible'),
(1, 'C', 2, 'accesible'),
(1, 'C', 3, 'comun'),
(1, 'C', 4, 'comun'),
(1, 'C', 5, 'comun'),
(1, 'C', 6, 'comun'),
(1, 'C', 7, 'comun'),
(1, 'C', 8, 'comun'),
(1, 'D', 1, 'comun'),
(1, 'D', 2, 'comun'),
(1, 'D', 3, 'comun'),
(1, 'D', 4, 'comun'),
(1, 'D', 5, 'comun'),
(1, 'D', 6, 'comun'),
(1, 'D', 7, 'comun'),
(1, 'D', 8, 'comun'),
(1, 'E', 1, 'comun'),
(1, 'E', 2, 'comun'),
(1, 'E', 3, 'comun'),
(1, 'E', 4, 'comun'),
(1, 'E', 5, 'comun'),
(1, 'E', 6, 'comun'),
(1, 'E', 7, 'comun'),
(1, 'E', 8, 'comun'),
(2, 'A', 1, 'comun'),
(2, 'A', 2, 'comun'),
(2, 'A', 3, 'comun'),
(2, 'A', 4, 'comun'),
(2, 'A', 5, 'comun'),
(2, 'A', 6, 'comun'),
(2, 'A', 7, 'comun'),
(2, 'A', 8, 'comun'),
(2, 'B', 1, 'comun'),
(2, 'B', 2, 'comun'),
(2, 'B', 3, 'comun'),
(2, 'B', 4, 'comun'),
(2, 'B', 5, 'comun'),
(2, 'B', 6, 'comun'),
(2, 'B', 7, 'comun'),
(2, 'B', 8, 'comun'),
(2, 'C', 1, 'accesible'),
(2, 'C', 2, 'accesible'),
(2, 'C', 3, 'comun'),
(2, 'C', 4, 'comun'),
(2, 'C', 5, 'comun'),
(2, 'C', 6, 'comun'),
(2, 'C', 7, 'comun'),
(2, 'C', 8, 'comun'),
(2, 'D', 1, 'comun'),
(2, 'D', 2, 'comun'),
(2, 'D', 3, 'comun'),
(2, 'D', 4, 'comun'),
(2, 'D', 5, 'comun'),
(2, 'D', 6, 'comun'),
(2, 'D', 7, 'comun'),
(2, 'D', 8, 'comun'),
(2, 'E', 1, 'comun'),
(2, 'E', 2, 'comun'),
(2, 'E', 3, 'comun'),
(2, 'E', 4, 'comun'),
(2, 'E', 5, 'comun'),
(2, 'E', 6, 'comun'),
(2, 'E', 7, 'comun'),
(2, 'E', 8, 'comun');

INSERT INTO funciones (pelicula_id, sala_id, fecha_hora, formato, precio_base) VALUES
(1, 1, '2026-11-07 14:30:00', '2D Doblada', 6000.00),
(1, 1, '2026-11-07 17:15:00', '2D Subtitulada', 6000.00),
(1, 1, '2026-11-07 20:00:00', '2D Doblada', 6000.00),
(1, 1, '2026-11-08 14:30:00', '2D Subtitulada', 6000.00),
(1, 1, '2026-11-08 17:15:00', '2D Doblada', 6000.00),
(1, 1, '2026-11-08 20:00:00', '2D Subtitulada', 6000.00),
(1, 1, '2026-11-09 14:30:00', '2D Doblada', 6000.00),
(1, 1, '2026-11-09 17:15:00', '2D Subtitulada', 6000.00),
(1, 1, '2026-11-09 20:00:00', '2D Doblada', 6000.00),
(2, 2, '2026-11-07 14:30:00', '2D Doblada', 5500.00),
(2, 2, '2026-11-07 17:15:00', '2D Subtitulada', 5500.00),
(2, 2, '2026-11-07 20:00:00', '2D Doblada', 5500.00),
(2, 2, '2026-11-08 14:30:00', '2D Subtitulada', 5500.00),
(2, 2, '2026-11-08 17:15:00', '2D Doblada', 5500.00),
(2, 2, '2026-11-08 20:00:00', '2D Subtitulada', 5500.00),
(2, 2, '2026-11-09 14:30:00', '2D Doblada', 5500.00),
(2, 2, '2026-11-09 17:15:00', '2D Subtitulada', 5500.00),
(2, 2, '2026-11-09 20:00:00', '2D Doblada', 5500.00),
(3, 1, '2026-11-07 14:30:00', '2D Doblada', 6000.00),
(3, 1, '2026-11-07 17:15:00', '2D Subtitulada', 6000.00),
(3, 1, '2026-11-07 20:00:00', '2D Doblada', 6000.00),
(3, 1, '2026-11-08 14:30:00', '2D Subtitulada', 6000.00),
(3, 1, '2026-11-08 17:15:00', '2D Doblada', 6000.00),
(3, 1, '2026-11-08 20:00:00', '2D Subtitulada', 6000.00),
(3, 1, '2026-11-09 14:30:00', '2D Doblada', 6000.00),
(3, 1, '2026-11-09 17:15:00', '2D Subtitulada', 6000.00),
(3, 1, '2026-11-09 20:00:00', '2D Doblada', 6000.00),
(4, 2, '2026-11-07 14:30:00', '2D Doblada', 6000.00),
(4, 2, '2026-11-07 17:15:00', '2D Subtitulada', 6000.00),
(4, 2, '2026-11-07 20:00:00', '2D Doblada', 6000.00),
(4, 2, '2026-11-08 14:30:00', '2D Subtitulada', 6000.00),
(4, 2, '2026-11-08 17:15:00', '2D Doblada', 6000.00),
(4, 2, '2026-11-08 20:00:00', '2D Subtitulada', 6000.00),
(4, 2, '2026-11-09 14:30:00', '2D Doblada', 6000.00),
(4, 2, '2026-11-09 17:15:00', '2D Subtitulada', 6000.00),
(4, 2, '2026-11-09 20:00:00', '2D Doblada', 6000.00),
(5, 1, '2026-11-07 14:30:00', '2D Doblada', 5500.00),
(5, 1, '2026-11-07 17:15:00', '2D Subtitulada', 5500.00),
(5, 1, '2026-11-07 20:00:00', '2D Doblada', 5500.00),
(5, 1, '2026-11-08 14:30:00', '2D Subtitulada', 5500.00),
(5, 1, '2026-11-08 17:15:00', '2D Doblada', 5500.00),
(5, 1, '2026-11-08 20:00:00', '2D Subtitulada', 5500.00),
(5, 1, '2026-11-09 14:30:00', '2D Doblada', 5500.00),
(5, 1, '2026-11-09 17:15:00', '2D Subtitulada', 5500.00),
(5, 1, '2026-11-09 20:00:00', '2D Doblada', 5500.00),
(6, 2, '2026-11-07 14:30:00', '2D Doblada', 6000.00),
(6, 2, '2026-11-07 17:15:00', '2D Subtitulada', 6000.00),
(6, 2, '2026-11-07 20:00:00', '2D Doblada', 6000.00),
(6, 2, '2026-11-08 14:30:00', '2D Subtitulada', 6000.00),
(6, 2, '2026-11-08 17:15:00', '2D Doblada', 6000.00),
(6, 2, '2026-11-08 20:00:00', '2D Subtitulada', 6000.00),
(6, 2, '2026-11-09 14:30:00', '2D Doblada', 6000.00),
(6, 2, '2026-11-09 17:15:00', '2D Subtitulada', 6000.00),
(6, 2, '2026-11-09 20:00:00', '2D Doblada', 6000.00);

-- Horarios adicionales por día para que cada película tenga más opciones.
INSERT INTO funciones (pelicula_id, sala_id, fecha_hora, formato, precio_base)
SELECT f.pelicula_id, f.sala_id,
       TIMESTAMP(f.fecha, h.hora),
       CASE WHEN h.hora < '16:00:00' THEN '2D Doblada' ELSE '2D Subtitulada' END,
       f.precio_base
FROM (
  SELECT DISTINCT pelicula_id, sala_id, DATE(fecha_hora) AS fecha, precio_base
  FROM funciones
) f
CROSS JOIN (
  SELECT '11:00:00' AS hora
  UNION ALL SELECT '12:45:00'
  UNION ALL SELECT '18:30:00'
  UNION ALL SELECT '22:30:00'
) h
WHERE NOT EXISTS (
  SELECT 1 FROM funciones x
  WHERE x.pelicula_id = f.pelicula_id
    AND x.sala_id = f.sala_id
    AND x.fecha_hora = TIMESTAMP(f.fecha, h.hora)
);

INSERT INTO productos_candy (nombre, categoria, precio, stock) VALUES
('Combo Pareja', 'combos', 12500.00, 60),
('Combo Pochoclo + Gaseosa', 'combos', 7500.00, 80),
('Palomitas Grandes', 'palomitas', 5000.00, 100),
('Palomitas Medianas', 'palomitas', 3500.00, 100),
('Gaseosa XL', 'bebidas', 3500.00, 120),
('Agua mineral', 'bebidas', 2000.00, 120),
('Nachos con queso', 'golosinas', 4500.00, 70),
('Chocolate', 'golosinas', 2000.00, 90),
('Gomitas', 'golosinas', 1800.00, 90);
