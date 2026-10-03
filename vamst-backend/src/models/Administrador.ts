// HERENCIA: un Administrador es un Usuario con permisos extra
// (por ejemplo, cargar películas o funciones nuevas).

import { Usuario } from "./Usuario";

export class Administrador extends Usuario {
  // TODO: métodos propios del admin, ej. puedeGestionarPeliculas(): boolean
}
