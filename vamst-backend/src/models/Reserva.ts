// MODELO: agrupa una función, un usuario y una lista de asientos.
// Acá se usa el polimorfismo de Asiento: no importa si son AsientoComun
// o AsientoAccesible, calcularTotal() los suma a todos igual.

import { Asiento } from "./Asiento";

export class Reserva {
  constructor(
    public readonly usuarioId: number,
    public readonly funcionId: number,
    private asientos: Asiento[],
    private precioBase: number
  ) {}

  calcularTotal(): number {
    // TODO: reservar cada asiento (asiento.reservar()) y sumar
    // asiento.calcularPrecio(this.precioBase) de todos ellos
    return 0;
  }
}
