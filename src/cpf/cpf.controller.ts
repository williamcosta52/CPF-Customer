import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CpfService } from './cpf.service';
import { CreateCpfDto } from './dto/create-cpf.dto';
import { UpdateCpfDto } from './dto/update-cpf.dto';

@Controller('cpf')
export class CpfController {
  constructor(private readonly cpfService: CpfService) {}

  @Post()
  create(@Body() createCpfDto: CreateCpfDto) {
    return this.cpfService.create(createCpfDto);
  }

  @Get()
  findAll() {
    return this.cpfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cpfService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCpfDto: UpdateCpfDto) {
    return this.cpfService.update(+id, updateCpfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cpfService.remove(+id);
  }
}
