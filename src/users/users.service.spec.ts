import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository, PrismaService],
    }).compile();
    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });
  it('should clean an CPF', async () => {
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
  it('should throw an error if CPF is invalid during user creation', async () => {
    const invalidCPF = '111.444.ag3';
    const createUserDto = {
      name: 'Test',
      cpf: invalidCPF,
      birthday: '28/01/1998',
    };
    await expect(service.create(createUserDto)).rejects.toThrow(
      'Invalid CPF: must have 11 digits',
    );
  });
  it('should create a user successfully', async () => {
    jest.spyOn(repository, 'verifyCPF').mockResolvedValue(null);
    const mockUser = {
      id: 1,
      name: 'Test',
      cpf: '11144477735',
      birthday: '28/01/1998',
    };
    jest.spyOn(repository, 'createUser').mockResolvedValue(mockUser);
    const createUserDto: CreateUserDto = {
      name: 'Test',
      cpf: '11144477735',
      birthday: '28/01/1998',
    };
    const createdUser = await service.create(createUserDto);
    expect(createdUser).toEqual(mockUser);
    expect(repository.verifyCPF).toHaveBeenCalledWith(createUserDto.cpf);
    expect(repository.createUser).toHaveBeenCalledWith(
      createUserDto.name,
      createUserDto.cpf,
      createUserDto.birthday,
    );
  });
});
