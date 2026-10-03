// ÚNICO archivo que le habla al backend (vamst-backend). Ninguna pantalla
// debería hacer fetch() directo: todas llaman a funciones de acá.

const BASE_URL = "http://localhost:3000/api";
// TODO: cuando pruebes desde el celular físico, cambiar localhost
// por la IP de tu compu en la red local (ej: "http://192.168.0.10:3000/api")

export async function getPeliculas() {
  // TODO: fetch(`${BASE_URL}/peliculas`), parsear el JSON,
  // devolver data.data (o tirar un error si data.ok === false)
}

export async function getPeliculaPorId(id: string) {
  // TODO: fetch(`${BASE_URL}/peliculas/${id}`)
}

export async function getFunciones(peliculaId: string) {
  // TODO: fetch(`${BASE_URL}/peliculas/${peliculaId}/funciones`)
}

export async function getAsientos(funcionId: string) {
  // TODO: fetch(`${BASE_URL}/funciones/${funcionId}/asientos`)
}

export async function crearReserva(funcionId: string, asientosIds: number[]) {
  // TODO: fetch POST a `${BASE_URL}/reservas` con
  // headers: { "Content-Type": "application/json" }
  // body: JSON.stringify({ funcionId, asientosIds })
}

export async function registrarUsuario(nombre: string, email: string, password: string) {
  // TODO: fetch POST a `${BASE_URL}/auth/registro`
}

export async function loginUsuario(email: string, password: string) {
  // TODO: fetch POST a `${BASE_URL}/auth/login`
}

export async function getProductosCandy(categoria?: string) {
  // TODO: fetch(`${BASE_URL}/candy` + (categoria ? `?categoria=${categoria}` : ""))
}
