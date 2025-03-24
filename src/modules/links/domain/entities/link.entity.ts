export class Link {
  constructor(
    public readonly id: string,
    private _empresa: number,
    public readonly limite_uso: number,
    public readonly uso: number,
    public readonly data_criacao: Date,
    public readonly data_expiracao: Date,
    public readonly active: boolean
  ) {}

  setEmpresa(empresa: number) {
    this._empresa = empresa;
  }
  get empresa(): number {
    return this._empresa;
  }
}
