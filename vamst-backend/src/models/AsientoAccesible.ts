import { Asiento } from "./Asiento";

export class AsientoAccesible extends Asiento {
  calcularPrecio(precioBase: number): number {
    return precioBase * 0.8;
  }

  getTipo(): string{
    return "accesible";
  }
}
