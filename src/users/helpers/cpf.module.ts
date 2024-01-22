import { Module } from '@nestjs/common';
import { CpfService } from './cpf.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [CpfService],
  providers: [CpfService],
})
export class CpfModule {}
