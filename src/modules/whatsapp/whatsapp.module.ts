import { Module } from '@nestjs/common';
import { EvolutionService } from './application/services/whatapp.service';

@Module({
  providers: [EvolutionService],
  // controllers: [WhatsappController],
})
export class WhatsappModule {}
