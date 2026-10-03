-- Creación de la base de datos y sus tablas.
-- Correr este archivo una sola vez (o cada vez que se resetee la base local).

CREATE DATABASE IF NOT EXISTS vamst;
USE vamst;

-- Usuarios: clientes y administradores del sistema (registro.tsx / login)
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  rol ENUM('cliente', 'admin') NOT NULL DEFAULT 'cliente',
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Películas: lo que se muestra en la cartelera (elegir_pelicula.tsx)
CREATE TABLE peliculas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  sinopsis TEXT,
  duracion_min INT,
  clasificacion VARCHAR(10),
  genero VARCHAR(50),
  poster_url VARCHAR(255)
);

-- Salas físicas del cine, cada una con su grilla de asientos
CREATE TABLE salas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  formato VARCHAR(20),      -- ej: "2D", "3D", "4DX"
  filas INT NOT NULL,
  columnas INT NOT NULL
);

-- Asientos físicos de cada sala. El campo "tipo" es clave para
-- las clases AsientoComun / AsientoAccesible del backend.
CREATE TABLE asientos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sala_id INT NOT NULL,
  fila VARCHAR(2) NOT NULL,
  numero INT NOT NULL,
  tipo ENUM('comun', 'accesible') NOT NULL DEFAULT 'comun',
  FOREIGN KEY (sala_id) REFERENCES salas(id)
);

-- Funciones: una película, en una sala, a una fecha/hora (detalle_pelicula.tsx)
CREATE TABLE funciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pelicula_id INT NOT NULL,
  sala_id INT NOT NULL,
  fecha_hora DATETIME NOT NULL,
  formato VARCHAR(20),
  precio_base DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (pelicula_id) REFERENCES peliculas(id),
  FOREIGN KEY (sala_id) REFERENCES salas(id)
);

-- Reservas hechas por un usuario para una función (seleccionar_asientos.tsx)
CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  funcion_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'confirmada',
  creada_en DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (funcion_id) REFERENCES funciones(id)
);

-- Asientos concretos que forman parte de una reserva.
-- El UNIQUE es lo que impide que dos personas reserven el mismo asiento
-- en la misma función, aunque lo intenten al mismo tiempo.
CREATE TABLE reserva_asientos (
  reserva_id INT NOT NULL,
  funcion_id INT NOT NULL,
  asiento_id INT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  UNIQUE (funcion_id, asiento_id),
  FOREIGN KEY (reserva_id) REFERENCES reservas(id),
  FOREIGN KEY (asiento_id) REFERENCES asientos(id)
);

-- Candy bar (tienda.tsx)
CREATE TABLE productos_candy (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  categoria VARCHAR(50),   -- ej: "combos", "bebidas", "golosinas"
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0
);
