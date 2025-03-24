import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkRepository } from './infrastructure/repositories/link.repository';
import { LinkService } from './application/services/link.service';
import { DatabaseModule } from 'src/infra/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LinkController],
  providers: [LinkService, LinkRepository],
  exports: [],
})
export class LinkModule {}
