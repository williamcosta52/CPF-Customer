import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    const validatedPage = Math.max(1, Math.round(page));
    const validatedLimit = Math.max(1, Math.round(limit));
    return this.usersService.findAll(validatedPage, validatedLimit);
  }
  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.usersService.findOne(cpf);
  }
}
