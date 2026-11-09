<<<<<<< HEAD
CREATE DATABASE IF NOT EXISTS vamst DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vamst;


=======
-- Creación de la base de datos y sus tablas.
-- Correr este archivo una sola vez (o cada vez que se resetee la base local).

SET NAMES utf8mb4;
CREATE DATABASE IF NOT EXISTS vamst DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vamst;

-- Usuarios: clientes y administradores del sistema (registro.tsx / login)
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  rol ENUM('cliente', 'admin') NOT NULL DEFAULT 'cliente',
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

<<<<<<< HEAD
=======
-- Películas: lo que se muestra en la cartelera (elegir_pelicula.tsx)
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
CREATE TABLE peliculas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  sinopsis TEXT,
  duracion_min INT,
  clasificacion VARCHAR(10),
  genero VARCHAR(50),
<<<<<<< HEAD
  poster_url VARCHAR(255),
  estado ENUM('estreno', 'preventa', 'proximo') NOT NULL DEFAULT 'estreno'
);


CREATE TABLE salas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  formato VARCHAR(20),      
=======
  poster_url VARCHAR(255)
);

-- Salas físicas del cine, cada una con su grilla de asientos
CREATE TABLE salas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  formato VARCHAR(20),      -- ej: "2D", "3D", "4DX"
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  filas INT NOT NULL,
  columnas INT NOT NULL
);

<<<<<<< HEAD

=======
-- Asientos físicos de cada sala. El campo "tipo" es clave para
-- las clases AsientoComun / AsientoAccesible del backend.
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
CREATE TABLE asientos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sala_id INT NOT NULL,
  fila VARCHAR(2) NOT NULL,
  numero INT NOT NULL,
  tipo ENUM('comun', 'accesible') NOT NULL DEFAULT 'comun',
  FOREIGN KEY (sala_id) REFERENCES salas(id)
);

<<<<<<< HEAD

=======
-- Funciones: una película, en una sala, a una fecha/hora (detalle_pelicula.tsx)
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
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

<<<<<<< HEAD

=======
-- Reservas hechas por un usuario para una función (seleccionar_asientos.tsx)
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  funcion_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
<<<<<<< HEAD
  metodo_pago ENUM('tarjeta', 'mercadopago', 'efectivo') NULL,
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'confirmada',
  creada_en DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (funcion_id) REFERENCES funciones(id)
);

<<<<<<< HEAD

=======
-- Asientos concretos que forman parte de una reserva.
-- El UNIQUE es lo que impide que dos personas reserven el mismo asiento
-- en la misma función, aunque lo intenten al mismo tiempo.
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
CREATE TABLE reserva_asientos (
  reserva_id INT NOT NULL,
  funcion_id INT NOT NULL,
  asiento_id INT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  UNIQUE (funcion_id, asiento_id),
  FOREIGN KEY (reserva_id) REFERENCES reservas(id),
  FOREIGN KEY (asiento_id) REFERENCES asientos(id)
);

<<<<<<< HEAD

CREATE TABLE productos_candy (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  categoria VARCHAR(50),   
=======
-- Candy bar (tienda.tsx)
CREATE TABLE productos_candy (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  categoria VARCHAR(50),   -- ej: "combos", "bebidas", "golosinas"
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0
);

<<<<<<< HEAD

=======
-- Pedidos del candy bar. "items" guarda el detalle como JSON
-- (nombre, precio y cantidad de cada producto al momento de la compra).
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
CREATE TABLE pedidos_candy (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NULL,
  items JSON NOT NULL,
  total DECIMAL(10,2) NOT NULL,
<<<<<<< HEAD
  metodo_pago ENUM('tarjeta', 'mercadopago', 'efectivo') NULL,
  creada_en DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


CREATE TABLE codigos_recuperacion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) NOT NULL,
  codigo CHAR(6) NOT NULL,
  expira_en DATETIME NOT NULL,
  usado TINYINT(1) NOT NULL DEFAULT 0,
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_recuperacion_email (email)
);
=======
  creada_en DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
