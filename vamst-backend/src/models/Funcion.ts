// MODELO: una función es "esta película, en esta sala, a esta hora".

export class Funcion {
  constructor(
    public readonly id: number,
    private peliculaId: number,
    private salaId: number,
    private fechaHora: Date,
    private formato: string,
    private precioBase: number
  ) {}

  // TODO: getPrecioBase(), getFechaHora(), etc.
}
