export class Usuario {
  constructor(
    public readonly id: number,
    protected nombre: string,
    protected email: string,
    private passwordHash: string
  ) {}

  getNombre(): string{
    return this.nombre;
  }
  getEmail(): string{
    return this.email;
  }
  getPasswordHash(): string{
    return this.passwordHash;
  }

  toJSON(){
    return{
      id: this.id, 
      nombre: this.nombre,
      email: this.email
    };
  }
}
