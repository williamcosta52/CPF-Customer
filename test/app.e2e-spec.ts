import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Users e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);

    await prisma.user.deleteMany();
    await app.init();
  });

  it('/ (GET) should return a Hello World', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/users (POST) => should register a CPF in the database', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Test',
        cpf: '111.444.777-35',
        birthday: '28/01/1998',
      })
      .expect(HttpStatus.CREATED);
  });
  it('/users (POST) => should return a status 422 (UNPROCESSABLE_ENTITY) when CPF is invalid', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Test',
        cpf: '111.444.777-05',
        birthday: '28/01/1998',
      })
      .expect({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Invalid CPF, please verify and try again',
      });
  });
  it('/users (POST) => should not register a CPF if it is already registered', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Test',
        cpf: '111.444.777-35',
        birthday: '28/01/1998',
      })
      .expect(HttpStatus.CREATED);

    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Test2',
        cpf: '111.444.777-35',
        birthday: '28/01/1998',
      })
      .expect({
        statusCode: HttpStatus.CONFLICT,
        message: 'CPF already registered',
      });
  });
  it('/users (POST) => should return a status 400 (BAD_REQUEST) and a message when CPF dont contains 11 digits', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Test2',
        cpf: '111.444.777',
        birthday: '28/01/1998',
      })
      .expect({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid CPF: must have 11 digits',
      });
  });
  it('/users (GET) => should return all users (CPFs)', async () => {
    await request(app.getHttpServer()).post('/users').send({
      name: 'Test',
      cpf: '111.444.777-35',
      birthday: '28/01/1998',
    });
    await request(app.getHttpServer()).post('/users').send({
      name: 'Test2',
      cpf: '23.456.789-09',
      birthday: '28/01/1998',
    });
    await request(app.getHttpServer()).post('/users').send({
      name: 'Test3',
      cpf: '987.654.321-09',
      birthday: '28/01/1998',
    });

    const users = await request(app.getHttpServer()).get('/users');
    expect(users).not.toBe(null);
    expect(users.body.length).toBe(1);
  });
  it('/users (GET) => should return 1 user per page using pagination', async () => {
    const createFirstUser = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Test',
        cpf: '111.444.777-35',
        birthday: '28/01/1998',
      })
      .expect(HttpStatus.CREATED);
    const createSecondUser = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Test2',
        cpf: '02841379019',
        birthday: '28/01/1998',
      })
      .expect(HttpStatus.CREATED);
    const firstUser = await request(app.getHttpServer()).get(
      '/users?page=1&limit=1',
    );
    expect(firstUser.body[0]).toEqual({
      id: createFirstUser.body.id,
      name: 'Test',
      cpf: '11144477735',
      birthday: '28/01/1998',
    });
    const secondUser = await request(app.getHttpServer()).get(
      '/users?page=2&limit=1',
    );
    expect(secondUser.body[0]).toEqual({
      id: createSecondUser.body.id,
      name: 'Test2',
      cpf: '02841379019',
      birthday: '28/01/1998',
    });
  });
  it('/users (GET) => should return a user by their CPF', async () => {
    const user = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Test',
        cpf: '111.444.777-35',
        birthday: '28/01/1998',
      })
      .expect(HttpStatus.CREATED);
    const response = await request(app.getHttpServer()).get(
      `/users/${user.body.cpf}`,
    );
    expect(response.body).toEqual({
      id: user.body.id,
      name: 'Test',
      cpf: '11144477735',
      birthday: '28/01/1998',
    });
  });
});
