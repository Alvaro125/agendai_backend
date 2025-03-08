import * as bcrypt from 'bcrypt';

export class User {
  constructor(
    public readonly idCliente: number,
    public readonly cpf: string,
    public readonly nome: string,
    public readonly email: string,
    public readonly telefone: string,
    private _senha: string,
  ) {}

  async setSenha(senha: string, salt: string): Promise<void> {
    try {
      this._senha = await bcrypt.hash(senha, salt);
    } catch {
      throw new Error('Error hashing password');
    }
  }

  async validateSenha(senha: string): Promise<boolean> {
    try {
      return await bcrypt.compare(this._senha, senha);
    } catch {
      throw new Error('Error comparing password');
    }
  }

  get senha(): string {
    return this._senha;
  }
}
