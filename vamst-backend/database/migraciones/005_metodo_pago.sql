-- Método de pago usado en cada compra (tarjeta, Mercado Pago o efectivo).
-- Queda NULL en las compras viejas, que se hicieron antes de existir el sistema de pago.
-- Se puede volver a ejecutar sin error: MariaDB ignora la columna si ya existe.
ALTER TABLE reservas
  ADD COLUMN IF NOT EXISTS metodo_pago ENUM('tarjeta','mercadopago','efectivo') NULL AFTER total;

ALTER TABLE pedidos_candy
  ADD COLUMN IF NOT EXISTS metodo_pago ENUM('tarjeta','mercadopago','efectivo') NULL AFTER total;
