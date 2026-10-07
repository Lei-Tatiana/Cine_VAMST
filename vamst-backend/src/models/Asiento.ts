export abstract class Asiento {
  private estado: "disponible" | "ocupado";

  constructor(
    public readonly id: number,
    protected readonly fila: string,
    protected readonly numero: number,
    estadoInicial: "disponible" | "ocupado" = "disponible"
  ) {
    this.estado = estadoInicial;
  }

  reservar(): void {
    if (this.estado === "ocupado"){
      throw new Error("El asiento ya está ocupado");
    }
    this.estado = "ocupado"
  }

  liberar(): void {
    this.estado = "disponible";
  }

  getEstado(): string {
    return this.estado;
  }

  abstract calcularPrecio(precioBase: number): number;

  abstract getTipo(): string;

  toJSON(precioBase: number)
  {
    return{
      id: this.id,
      fila: this.fila,
      numero: this.numero, 
      tipo: this.getTipo,
      estado: this.estado,
      precio: this.calcularPrecio(precioBase),
    };
  }
}
