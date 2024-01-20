import { Module } from '@nestjs/common';
import { CpfService } from './cpf.service';
import { CpfController } from './cpf.controller';

@Module({
  controllers: [CpfController],
  providers: [CpfService],
})
export class CpfModule {}
