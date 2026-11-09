USE vamst;

INSERT INTO funciones (pelicula_id, sala_id, fecha_hora, formato, precio_base)
SELECT p.id,
       CASE WHEN p.id % 2 = 0 THEN 2 ELSE 1 END,
       TIMESTAMP(DATE_ADD('2027-11-11', INTERVAL d.dia DAY), h.hora),
       CASE WHEN h.hora < '16:00:00' THEN '2D Doblada' ELSE '2D Subtitulada' END,
       CASE WHEN p.id % 3 = 0 THEN 6500.00 WHEN p.id % 3 = 1 THEN 6000.00 ELSE 5500.00 END
FROM peliculas p
CROSS JOIN (
  SELECT 0 AS dia UNION ALL SELECT 1 UNION ALL SELECT 2
) d
CROSS JOIN (
  SELECT '11:30:00' AS hora
  UNION ALL SELECT '14:00:00'
  UNION ALL SELECT '16:30:00'
  UNION ALL SELECT '19:00:00'
  UNION ALL SELECT '21:30:00'
) h
WHERE p.estado = 'estreno'
  AND NOT EXISTS (SELECT 1 FROM funciones f WHERE f.pelicula_id = p.id)
ORDER BY p.id, d.dia, h.hora;


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

SELECT (SELECT COUNT(*) FROM funciones) AS funciones,
       (SELECT COUNT(DISTINCT pelicula_id) FROM funciones) AS peliculas_con_funciones;
