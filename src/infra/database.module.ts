import { Module } from '@nestjs/common';
import Knex, { Knex as IKnex } from 'knex';
import { DatabaseInitService } from './databaseInit.service';
const knexProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: (): IKnex => {
    return Knex({
      client: 'sqlite3',
      connection: {
        filename: './database.sqlite',
      },
      useNullAsDefault: true,
    });
  },
};

@Module({
  providers: [knexProvider, DatabaseInitService],
  exports: [knexProvider],
})
export class DatabaseModule {}
