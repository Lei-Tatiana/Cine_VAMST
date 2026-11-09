-- 004: códigos para restablecer la contraseña.

SET NAMES utf8mb4;
USE vamst;

CREATE TABLE IF NOT EXISTS codigos_recuperacion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) NOT NULL,
  codigo CHAR(6) NOT NULL,
  expira_en DATETIME NOT NULL,
  usado TINYINT(1) NOT NULL DEFAULT 0,
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_recuperacion_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
