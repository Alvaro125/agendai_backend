CREATE TABLE Cliente (
    idCliente INT PRIMARY KEY,
    cpf VARCHAR(45),
    email VARCHAR(45),
    nome VARCHAR(45),
    telefone VARCHAR(45),
    senha VARCHAR(45)
);

CREATE TABLE Empresa (
    cnpj VARCHAR(45) PRIMARY KEY,
    email VARCHAR(45),
    senha VARCHAR(45),
    endereco VARCHAR(45)
);

CREATE TABLE Funcionario (
    cpf VARCHAR(45) PRIMARY KEY,
    empresa VARCHAR(45),
    nome VARCHAR(45),
    email VARCHAR(45),
    telefone VARCHAR(45),
    data_nasc TIMESTAMP,
    cargo VARCHAR(45),
    senha VARCHAR(45),
    CONSTRAINT empresa_idx FOREIGN KEY (empresa) REFERENCES Empresa(cnpj)
);

CREATE TABLE Servico (
    idServico INT PRIMARY KEY,
    empresa VARCHAR(45),
    preco FLOAT,
    nome VARCHAR(45),
    duracao VARCHAR(45),
    categoria VARCHAR(45),
    CONSTRAINT empresa_idx FOREIGN KEY (empresa) REFERENCES Empresa(cnpj)
);

CREATE TABLE Agenda_de_disponibilidade (
    diasDisponives TIMESTAMP,
    idServico INT,
    cpfFuncionario VARCHAR(45),
    horariosDisponiveis TIMESTAMP,
    PRIMARY KEY (diasDisponives, idServico, cpfFuncionario),
    CONSTRAINT servico_idx FOREIGN KEY (idServico) REFERENCES Servico(idServico),
    CONSTRAINT funcionario_idx FOREIGN KEY (cpfFuncionario) REFERENCES Funcionario(cpf)
);

CREATE TABLE Agendamento (
    idAgendamento INT PRIMARY KEY,
    idCliente INT,
    idServico INT,
    data DATE,
    horario TIME,
    CONSTRAINT cliente_idx FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente),
    CONSTRAINT servico_idx FOREIGN KEY (idServico) REFERENCES Servico(idServico)
);

CREATE TABLE Prestacao_de_servico (
    idPrestacaoServico INT PRIMARY KEY,
    idAgendamento INT,
    cpfFuncionario VARCHAR(45),
    status INT,
    inicio TIMESTAMP,
    termino TIMESTAMP,
    CONSTRAINT agendamento_idx FOREIGN KEY (idAgendamento) REFERENCES Agendamento(idAgendamento),
    CONSTRAINT funcionario_idx FOREIGN KEY (cpfFuncionario) REFERENCES Funcionario(cpf)
);

CREATE TABLE Avaliacao (
    idAvaliacao INT PRIMARY KEY,
    idPrestacaoServico INT,
    questoes JSON,
    valores JSON,
    comentario VARCHAR(45),
    CONSTRAINT prestacaoServico_idx FOREIGN KEY (idPrestacaoServico) REFERENCES Prestacao_de_servico(idPrestacaoServico)
);
