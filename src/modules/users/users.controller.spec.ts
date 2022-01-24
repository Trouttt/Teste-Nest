import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const userEntityList: UserEntity[] = [
  new UserEntity({ id: '1', name: 'user-1', cpf: '123.456.789-96', cep: '27998-999', publicSpace: 'atrás da praça', state: 'SP', city: 'São Paulo', }),
  new UserEntity({ id: '2', name: 'user-2', cpf: '321.125.765-98', cep: '12354-123', publicSpace: 'perto da igreja', state: 'RJ', city: 'Rio de Janeiro', }),
  new UserEntity({ id: '3', name: 'user-3', cpf: '124.765.236-12', cep: '64433-512', publicSpace: 'em frente ao quiosque', state: 'MG', city: 'Cabiunas', }),

]

const newUserEntity: UserEntity = new UserEntity({
  name: 'user',
  cpf: '123.111.556-11',
  cep: '29000-000',
  publicSpace: 'perto da casinha',
  state: 'SP',
  city: 'São Paulo'
})

const updatedUserEntity: UserEntity = new UserEntity({
  name: 'user-updated',
  cpf: '123.111.556-14',
  cep: '29000-010',
  publicSpace: 'perto da casinha',
  state: 'SP',
  city: 'São Paulo'
})


describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(userEntityList),
            create: jest.fn().mockResolvedValue(newUserEntity),
            update: jest.fn().mockResolvedValue(updatedUserEntity),
            delete: jest.fn().mockResolvedValue(undefined),
          }
        }
      ]
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();

  });

});
