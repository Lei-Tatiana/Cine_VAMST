-- 002: estado de las películas (estreno / preventa / proximo).
-- Se puede correr más de una vez: la columna se agrega solo si no existe
-- y las funciones de preventa solo se insertan si faltan.

USE vamst;

-- MySQL no acepta ADD COLUMN IF NOT EXISTS (MariaDB sí), así que preguntamos
-- primero a information_schema si la columna ya está.
SET @columna_existe := (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'peliculas'
    AND COLUMN_NAME = 'estado'
);

SET @sql := IF(
  @columna_existe = 0,
  "ALTER TABLE peliculas ADD COLUMN estado ENUM('estreno','preventa','proximo') NOT NULL DEFAULT 'estreno'",
  "SELECT 'La columna estado ya existe' AS aviso"
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Las películas que ya existían quedan como 'estreno'. Solo cambiamos las
-- que se venden con anticipación o todavía no tienen funciones.
UPDATE peliculas
SET estado = 'preventa'
WHERE titulo IN (
  'Terrifier 3',
  'El conjuro 4 Ultimos ritos',
  'Scream VI',
  'Sonrie 2',
  'Destino final Lazos de sangre'
);

UPDATE peliculas
SET estado = 'proximo'
WHERE titulo IN (
  'IT Capitulo Dos',
  'La monja II',
  'Annabelle vuelve a casa',
  'Un lugar en silencio Parte II',
  'Spider-Man Cruzando el Multiverso'
);

-- Funciones de preventa: 3, 4 y 5 de diciembre de 2027 (14:30, 17:15 y 20:00).
INSERT INTO funciones (pelicula_id, sala_id, fecha_hora, formato, precio_base)
SELECT
  p.id,
  CASE WHEN p.id % 2 = 0 THEN 2 ELSE 1 END,
  h.fecha_hora,
  h.formato,
  6500.00
FROM peliculas p
CROSS JOIN (
            SELECT '2027-12-03 14:30:00' AS fecha_hora, '2D Doblada' AS formato
  UNION ALL SELECT '2027-12-03 17:15:00', '2D Subtitulada'
  UNION ALL SELECT '2027-12-03 20:00:00', '2D Doblada'
  UNION ALL SELECT '2027-12-04 14:30:00', '2D Doblada'
  UNION ALL SELECT '2027-12-04 17:15:00', '2D Subtitulada'
  UNION ALL SELECT '2027-12-04 20:00:00', '2D Doblada'
  UNION ALL SELECT '2027-12-05 14:30:00', '2D Doblada'
  UNION ALL SELECT '2027-12-05 17:15:00', '2D Subtitulada'
  UNION ALL SELECT '2027-12-05 20:00:00', '2D Doblada'
) h
WHERE p.estado = 'preventa'
  AND NOT EXISTS (
    SELECT 1
    FROM funciones f
    WHERE f.pelicula_id = p.id
      AND f.sala_id = CASE WHEN p.id % 2 = 0 THEN 2 ELSE 1 END
      AND f.fecha_hora = h.fecha_hora
  );

SELECT estado, COUNT(*) AS peliculas
FROM peliculas
GROUP BY estado;
