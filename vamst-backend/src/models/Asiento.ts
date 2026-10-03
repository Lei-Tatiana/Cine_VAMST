// MODELO BASE (clase abstracta): acá vive el ENCAPSULAMIENTO.
// "estado" es privado: nadie puede cambiarlo directo, solo a través
// de reservar() / liberar(), que validan antes de modificarlo.

export abstract class Asiento {
  private estado: "disponible" | "ocupado" = "disponible";

  constructor(
    public readonly id: number,
    protected readonly fila: string,
    protected readonly numero: number
  ) {}

  reservar(): void {
    // TODO: si ya está "ocupado", tirar un Error("El asiento ya está ocupado")
    // si no, cambiar el estado a "ocupado"
  }

  liberar(): void {
    // TODO: volver el estado a "disponible"
  }

  getEstado(): string {
    return this.estado;
  }

  // POLIMORFISMO: cada tipo de asiento va a calcular su precio distinto.
  // Por eso es abstracto acá y cada clase hija lo implementa a su manera.
  abstract calcularPrecio(precioBase: number): number;
}
