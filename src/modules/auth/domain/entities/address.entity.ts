export class Address {
  constructor(
    public readonly idEndereco: number,
    public readonly pais: string,
    public readonly estado: string,
    public readonly cidade: string,
    public readonly lougradouro: string,
    public readonly bairro: string,
    public readonly numero: string,
    public readonly code: string,
  ) {}
}
