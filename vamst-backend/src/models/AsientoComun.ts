import { Asiento } from "./Asiento";

export class AsientoComun extends Asiento {
  calcularPrecio(precioBase: number): number {
    return precioBase;
  }

  getTipo(): string{
    return "comun";
  }
}
