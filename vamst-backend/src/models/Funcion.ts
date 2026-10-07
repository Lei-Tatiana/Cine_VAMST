export class Funcion {
  constructor(
    public readonly id: number,
    private peliculaId: number,
    private salaId: number,
    private fechaHora: Date,
    private formato: string,
    private precioBase: number
  ) {}

  getPeliculaId(): number {
    return this.peliculaId;
  }
  getSalaId(): number {
    return this.salaId;
  }
  getFechaHora(): Date {
    return this.fechaHora;
  }
  getFormato(): string {
    return this.formato;
  }
  getPrecioBase(): number {
    return this.precioBase;
  }

  toJSON(){
    return{
      peliculaId: this.peliculaId,
      salaId: this.salaId,
      fechaHora: this.fechaHora,
      formato: this.formato,
      precioBase: this.precioBase
    }
  }
}
