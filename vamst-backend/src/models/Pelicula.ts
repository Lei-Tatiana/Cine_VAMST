<<<<<<< HEAD
export type EstadoPelicula = "estreno" | "preventa" | "proximo";

=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
export class Pelicula {
  constructor(
    public readonly id: number,
    private titulo: string, 
    private sinopsis: string,
    private duracionMin: number,
    private clasificacion: string,
    private genero: string,
<<<<<<< HEAD
    private posterUrl: string,
    private estado: EstadoPelicula
=======
    private posterUrl: string
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
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
<<<<<<< HEAD
  getEstado(): EstadoPelicula {
    return this.estado;
  }
=======
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78

  toJSON(){
    return{
      id: this.id,
      titulo: this.titulo,
      sinopsis: this.sinopsis,
      duracionMin: this.duracionMin,
      clasificacion: this.clasificacion,
      genero: this.genero,
<<<<<<< HEAD
      posterUrl: this.posterUrl,
      estado: this.estado
=======
      posterUrl: this.posterUrl
>>>>>>> ffb8e81d329bc0e2e3d67c48a118482b80e36e78
    }
  }
}