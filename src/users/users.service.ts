import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const cpf = this.cleanCPF(createUserDto.cpf);
    this.validateCPF(cpf);
    const validCPF = this.calculateAndVerifyCPF(cpf);
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
  private cleanCPF(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }
  private validateCPF(cpf: string): void {
    if (cpf.length !== 11) {
      throw new HttpException(
        'Invalid CPF: must have 11 digits',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  private calculateAndVerifyCPF(baseCPF: string): string {
    const newCPF = baseCPF.substring(0, 9);
    const cpfWithFirstDigit = this.calculateDigit(newCPF, 10);
    const cpfWithSecondDigit = this.calculateDigit(cpfWithFirstDigit, 11);
    return cpfWithSecondDigit;
  }
  private calculateDigit(baseCPF: string, num: number): string {
    let sum = 0;
    for (let i = 0; i < baseCPF.length; i++) {
      const digit = Number(baseCPF[i]);
      sum += digit * num;
      num--;
    }
    let rest = sum % 11;
    const calculatedDigit = rest < 2 ? 0 : 11 - rest;
    const result = baseCPF + `${calculatedDigit}`;
    return result;
  }
  async findAll(page: number, limit: number) {
    const skipPage = (page - 1) * limit;
    return await this.repository.findAll(skipPage, limit);
  }
  async findOne(cpf: string) {
    const cleanCPF = await this.cleanCPF(cpf);
    const verifyCPF = await this.repository.verifyCPF(
      cleanCPF ? cleanCPF : cpf,
    );
    if (!verifyCPF)
      throw new HttpException('CPF not found', HttpStatus.NOT_FOUND);
    return verifyCPF;
  }
}
