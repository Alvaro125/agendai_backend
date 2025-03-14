export class Attendance {
  constructor(
    public readonly idServico: number,
    private _empresa: number,
    public readonly preco: number,
    public readonly nome: string,
    public readonly descricao: string,
    public readonly duracao: string,
    public readonly categoria: string,
    public readonly imagem: string,
  ) {}

  setEmpresa(empresa: number) {
    this._empresa = empresa;
  }
  get empresa(): number {
    return this._empresa;
  }
}
