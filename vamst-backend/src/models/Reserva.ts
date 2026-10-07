import { Asiento } from "./Asiento";

export class Reserva {
  private total: number = 0;

  constructor(
    public readonly usuarioId: number,
    public readonly funcionId: number,
    private asientos: Asiento[],
    private precioBase: number
  ) {}

  calcularTotal(): number {
    this.total = this.asientos.reduce((suma, asiento) => {
      asiento.reservar();
      return suma + asiento.calcularPrecio(this.precioBase);
    }, 0);
    return this.total;
  }

  getTotal(): number{
    return this.total;
  }

  getAsientos(): Asiento[]{
    return this.asientos;
  }
}
