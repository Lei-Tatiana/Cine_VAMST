export class Usuario {
  constructor(
    public readonly id: number,
    private nombre: string,
    private email: string,
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
