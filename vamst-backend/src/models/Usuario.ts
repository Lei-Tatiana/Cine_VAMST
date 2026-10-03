// MODELO BASE de usuario. Cliente y Administrador heredan de acá.
// La contraseña NUNCA se guarda en texto plano: siempre hasheada (bcrypt).

export class Usuario {
  constructor(
    public readonly id: number,
    protected nombre: string,
    protected email: string,
    private passwordHash: string
  ) {}

  // TODO: getNombre(), getEmail()

  // TODO: verificarPassword(passwordPlano: string): Promise<boolean>
  // usando bcrypt.compare(passwordPlano, this.passwordHash)
}
