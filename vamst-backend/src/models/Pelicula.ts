export class Pelicula {
  constructor(
    public readonly id: number,
    private titulo: string, 
    private sinopsis: string,
    private duracionMin: number,
    private clasificacion: string,
    private genero: string,
    private posterUrl: string
  ) {}

  getTitulo(): string {
    return this.titulo;
  }
  getSinopsis(): string {
    return this.sinopsis;
  }
  getDuracionMin(): number {
    return this.duracionMin;
  }
  getClasificacion(): string {
    return this.clasificacion;
  }
  getGenero(): string {
    return this.genero;
  }
  getPosterUrl(): string {
    return this.posterUrl;
  }

  toJSON(){
    return{
      id: this.id,
      titulo: this.titulo,
      sinopsis: this.sinopsis,
      duracionMin: this.duracionMin,
      clasificacion: this.clasificacion,
      genero: this.genero,
      posterUrl: this.posterUrl
    }
  }
}