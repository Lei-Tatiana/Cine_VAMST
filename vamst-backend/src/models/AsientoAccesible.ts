// HERENCIA + POLIMORFISMO: mismo método que AsientoComun,
// pero con un cálculo distinto (ej: descuento).

import { Asiento } from "./Asiento";

export class AsientoAccesible extends Asiento {
  calcularPrecio(precioBase: number): number {
    // TODO: por ejemplo, devolver precioBase * 0.8 (20% de descuento)
    return 0;
  }
}
