import { Injectable, OnModuleInit } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as knex from 'knex';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseInitService.name);
  private knexInstance: knex.Knex;

  constructor(private configService: ConfigService) { }

  async onModuleInit() {
    try {
      await this.initializeDatabase();
      this.logger.log(
        'Inicialização do banco de dados SQLite concluída com sucesso.',
      );
    } catch (error) {
      this.logger.error(`Erro ao inicializar banco de dados: ${error.message}`);
      throw error;
    }
  }

  private async initializeDatabase(): Promise<void> {
    const dbPath = this.configService.get<string>('DB_PATH', 'database.sqlite');
    const dbDir = path.dirname(dbPath);

    // Garantir que o diretório exista
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
      this.logger.log(`Diretório ${dbDir} criado.`);
    }

    this.logger.log(`Inicializando banco de dados SQLite em: ${dbPath}`);

    // Criar instância do Knex com SQLite
    this.knexInstance = knex({
      client: 'better-sqlite3',
      connection: {
        filename: dbPath,
      },
      useNullAsDefault: true,
    });

    // Criar as tabelas
    await this.createTables();
  }

  private async createTables(): Promise<void> {
    this.logger.log('Verificando e criando tabelas...');

    // Tabela Cliente
    if (!(await this.knexInstance.schema.hasTable('Cliente'))) {
      await this.knexInstance.schema.createTable('Cliente', (table) => {
        table.integer('idCliente').primary();
        table.string('cpf', 45).unique().nullable();
        table.string('email', 80).unique();
        table.string('nome', 45);
        table.string('telefone', 45);
        table.integer('status').defaultTo(1);
        table.string('senha', 45);
      });
      this.logger.log('Tabela Cliente criada.');
    }

    // Tabela Empresa
    if (!(await this.knexInstance.schema.hasTable('Empresa'))) {
      await this.knexInstance.schema.createTable('Empresa', (table) => {
        table.integer('idEmpresa').primary();
        table.string('nome', 80).notNullable();
        table.string('nome_empresa', 80).notNullable();
        table.string('cnpj', 45).unique();
        table.string('telefone', 45).unique();
        table.string('email', 45).unique();
        table.string('senha', 80);
        table.string('provider', 45);
        table.text('imagem').defaultTo('');
        table.integer('endereco').references('idEndereco').inTable('Endereco');
      });
      this.logger.log('Tabela Empresa criada.');
    }

    if (!(await this.knexInstance.schema.hasTable('Endereco'))) {
      await this.knexInstance.schema.createTable('Endereco', (table) => {
        table.integer('idEndereco').primary();
        table.string('pais', 2);
        table.string('estado', 45);
        table.string('cidade', 45);
        table.string('lougradouro', 80);
        table.string('bairro', 80);
        table.string('numero', 10);
        table.string('code', 25);
      });
      this.logger.log('Tabela Endereço criada.');
    }

    // Tabela Funcionario
    if (!(await this.knexInstance.schema.hasTable('Funcionario'))) {
      await this.knexInstance.schema.createTable('Funcionario', (table) => {
        table.string('cpf', 45).primary();
        table
          .string('empresa', 45)
          .references('cnpj')
          .inTable('Empresa')
          .onDelete('CASCADE');
        table.string('nome', 45);
        table.string('email', 45);
        table.string('telefone', 45);
        table.timestamp('data_nasc');
        table.string('cargo', 45);
        table.string('senha', 45);
        table.index('empresa', 'empresa_idx');
      });
      this.logger.log('Tabela Funcionario criada.');
    }

    // Tabela Servico
    if (!(await this.knexInstance.schema.hasTable('Servico'))) {
      await this.knexInstance.schema.createTable('Servico', (table) => {
        table.integer('idServico').primary();
        table
          .integer('empresa')
          .references('idEmpresa')
          .inTable('Empresa')
          .onDelete('CASCADE');
        table.float('preco').notNullable();
        table.string('nome', 45).notNullable();
        table.text('descricao').notNullable();
        table.string('duracao', 45);
        table.string('categoria', 45);
        table.text('imagem').defaultTo('');
        // table.index('empresa', 'empresa_idx');
      });
      this.logger.log('Tabela Servico criada.');
    }

    // Tabela Cliente já deve existir para criar Agendamento
    if (!(await this.knexInstance.schema.hasTable('Agendamento'))) {
      await this.knexInstance.schema.createTable('Agendamento', (table) => {
        table.integer('idAgendamento').primary();
        table
          .integer('idCliente')
          .references('idCliente')
          .inTable('Cliente')
          .onDelete('CASCADE');
        table
          .integer('idServico')
          .references('idServico')
          .inTable('Servico')
          .onDelete('CASCADE');
        table.date('data');
        table.time('horario');
      });
      this.logger.log('Tabela Agendamento criada.');
    }

    // Tabela Agenda_de_disponibilidade
    if (
      !(await this.knexInstance.schema.hasTable('Agenda_de_disponibilidade'))
    ) {
      await this.knexInstance.schema.createTable(
        'Agenda_de_disponibilidade',
        (table) => {
          table.timestamp('diasDisponives');
          table
            .integer('idServico')
            .references('idServico')
            .inTable('Servico')
            .onDelete('CASCADE');
          table
            .string('cpfFuncionario', 45)
            .references('cpf')
            .inTable('Funcionario')
            .onDelete('CASCADE');
          table.timestamp('horariosDisponiveis');
          table.primary(['diasDisponives', 'idServico', 'cpfFuncionario']);
          table.index('idServico', 'servico_idx');
          table.index('cpfFuncionario', 'funcionario_idx');
        },
      );
      this.logger.log('Tabela Agenda_de_disponibilidade criada.');
    }

    // Tabela Prestacao_de_servico
    if (!(await this.knexInstance.schema.hasTable('Prestacao_de_servico'))) {
      await this.knexInstance.schema.createTable(
        'Prestacao_de_servico',
        (table) => {
          table.integer('idPrestacaoServico').primary();
          table
            .integer('idAgendamento')
            .references('idAgendamento')
            .inTable('Agendamento')
            .onDelete('CASCADE');
          table
            .string('cpfFuncionario', 45)
            .references('cpf')
            .inTable('Funcionario')
            .onDelete('CASCADE');
          table.integer('status');
          table.timestamp('inicio');
          table.timestamp('termino');
          table.index('idAgendamento', 'agendamento_idx');
          table.index('cpfFuncionario', 'funcionario_idx');
        },
      );
      this.logger.log('Tabela Prestacao_de_servico criada.');
    }

    // Tabela Avaliacao
    if (!(await this.knexInstance.schema.hasTable('Avaliacao'))) {
      await this.knexInstance.schema.createTable('Avaliacao', (table) => {
        table.integer('idAvaliacao').primary();
        table
          .integer('idPrestacaoServico')
          .references('idPrestacaoServico')
          .inTable('Prestacao_de_servico')
          .onDelete('CASCADE');
        table.json('questoes');
        table.json('valores');
        table.string('comentario', 45);
        table.index('idPrestacaoServico', 'prestacaoServico_idx');
      });
      this.logger.log('Tabela Avaliacao criada.');
    }

    if (!(await this.knexInstance.schema.hasTable('Links'))) {
      await this.knexInstance.schema.createTable('Links', (table) => {
        table.uuid('id').defaultTo(this.knexInstance.fn.uuid()).primary(); // Removi defaultTo(this.knexInstance.fn.uuid()) pois SQLite não suporta UUID nativamente
        table
          .integer('empresa')
          .references('idEmpresa')
          .inTable('Empresa')
          .onDelete('CASCADE');
        table.integer('limite_uso').defaultTo(1);
        table.integer('uso').defaultTo(0);
        table.timestamp('data_criacao').defaultTo(this.knexInstance.fn.now()); // Removido (6)
        table.timestamp('data_expiracao');
        table.boolean('active').defaultTo(true);
      });
      this.logger.log('Tabela Links criada.');
    }
    this.logger.log(
      'Todas as tabelas foram verificadas e criadas conforme necessário.',
    );
  }
}
