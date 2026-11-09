-- Método de pago usado en cada compra (tarjeta, Mercado Pago o efectivo).

ALTER TABLE reservas
  ADD COLUMN IF NOT EXISTS metodo_pago ENUM('tarjeta','mercadopago','efectivo') NULL AFTER total;

ALTER TABLE pedidos_candy
  ADD COLUMN IF NOT EXISTS metodo_pago ENUM('tarjeta','mercadopago','efectivo') NULL AFTER total;
