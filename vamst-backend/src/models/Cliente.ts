// HERENCIA: un Cliente es un Usuario con permisos limitados
// (solo puede reservar, no administrar el sistema).

import { Usuario } from "./Usuario";

export class Cliente extends Usuario {
  // TODO: agregar acá lo que sea propio de un cliente,
  // por ejemplo un historial de reservas si lo necesitás más adelante
}
