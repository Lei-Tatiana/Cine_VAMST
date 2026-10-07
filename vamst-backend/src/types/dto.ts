// src/types/dto.ts
export interface CrearReservaDTO {
  usuarioId: number;
  funcionId: number;
  asientosIds: number[];
}

export interface RegistroUsuarioDTO {
  nombre: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}