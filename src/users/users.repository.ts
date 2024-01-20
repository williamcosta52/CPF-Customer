import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}
  createUser(name: string, cpf: string, birthday: string) {
    return this.prisma.user.create({
      data: {
        name,
        cpf,
        birthday,
      },
    });
  }
  verifyCPF(cpf: string) {
    return this.prisma.user.findFirst({
      where: { cpf },
    });
  }
  findAll(skip: number, limit: number) {
    return this.prisma.user.findMany({
      skip,
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });
  }
}
