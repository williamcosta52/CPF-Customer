import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { CpfService } from './helpers/cpf.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly cpfService: CpfService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const cpf = this.cpfService.cleanCPF(createUserDto.cpf);
    this.cpfService.validateCPFlength(cpf);
    const validCPF = this.cpfService.calculateAndVerifyCPF(cpf);
    if (cpf !== validCPF)
      throw new HttpException(
        'Invalid CPF, please verify and try again',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    const verifyCPFinDB = await this.repository.verifyCPF(validCPF);
    if (verifyCPFinDB)
      throw new HttpException('CPF already registered', HttpStatus.CONFLICT);
    return await this.repository.createUser(
      createUserDto.name,
      validCPF,
      createUserDto.birthday,
    );
  }
  async findAll(page: number, limit: number) {
    const skipPage = (page - 1) * limit;
    return await this.repository.findAll(skipPage, limit);
  }
  async findOne(cpf: string) {
    const cleanCPF = await this.cpfService.cleanCPF(cpf);
    const verifyCPF = await this.repository.verifyCPF(
      cleanCPF ? cleanCPF : cpf,
    );
    if (!verifyCPF)
      throw new HttpException('CPF not found', HttpStatus.NOT_FOUND);
    return verifyCPF;
  }
}
