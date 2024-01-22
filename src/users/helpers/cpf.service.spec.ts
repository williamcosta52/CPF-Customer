import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersRepository } from '../users.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { CpfService } from './cpf.service';

describe('UsersService', () => {
  let service: CpfService;
  let repository: UsersRepository;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository, PrismaService, CpfService],
    }).compile();
    service = module.get<CpfService>(CpfService);
    repository = module.get<UsersRepository>(UsersRepository);
    userService = module.get<UsersService>(UsersService);
  });
  it('should clean an CPF', () => {
    const cpf = '111.444.777-35';
    const cleanedCPF = service.cleanCPF(cpf);
    expect(cleanedCPF).toBe('11144477735');
  });
  it('should calculate and verify CPF correctly', () => {
    const baseCPF = '111444777';
    const calculatedAndVerifiedCPF = service.calculateAndVerifyCPF(baseCPF);
    const expectedCPF = '11144477735';
    expect(calculatedAndVerifiedCPF).toBe(expectedCPF);
  });
  it('should throw an error if CPF is invalid during user creation', () => {
    const invalidCPF = '111.444.ag3';
    const createUserDto = {
      name: 'Test',
      cpf: invalidCPF,
      birthday: '28/01/1998',
    };
    expect(userService.create(createUserDto)).rejects.toThrow(
      'Invalid CPF: must have 11 digits',
    );
  });
});
