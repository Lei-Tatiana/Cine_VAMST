// HERENCIA: extiende de Asiento y solo agrega lo que le es propio.

import { Asiento } from "./Asiento";

export class AsientoComun extends Asiento {
  calcularPrecio(precioBase: number): number {
    // TODO: el asiento común paga el precio normal, sin cambios
    return 0;
  }
}
