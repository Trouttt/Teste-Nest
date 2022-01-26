import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
  let userController: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(userEntityList),
            create: jest.fn().mockResolvedValue(newUserEntity),
            update: jest.fn().mockResolvedValue(updatedUserEntity),
            delete: jest.fn().mockResolvedValue(undefined),
          }
        }
      ]
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();

  });
  describe('getAllUsers', () => {
    it('should return a user list sucessfully', async () => {
      const result = await userController.getAllUsers();

      expect(result).toEqual(userEntityList);
      expect(typeof result).toEqual('object');
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });
    it('should throw an expection', () => {
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());

      expect(userController.getAllUsers()).rejects.toThrowError();
    });
  })
  describe('create', () => {
    it('should create a new user item sucessfully', async () => {
      const body: CreateUserDto = {
        name: 'user',
    
        cpf: '123.111.556-11',
        cep: '29000-000',
        publicSpace: 'perto da casinha',
        state: 'SP',
        city: 'São Paulo'
      }

      const result = await userController.createUser(body);

      expect(result).toEqual(newUserEntity);
      expect(userService.create).toHaveBeenCalledWith(body);
    })
    it('should throw an expection', () => {
      const body: CreateUserDto = {
        name: 'user',
        cpf: '123.111.556-11',
        cep: '29000-000',
        publicSpace: 'perto da casinha',
        state: 'SP',
        city: 'São Paulo'
      }

      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());

      expect(userController.createUser(body)).rejects.toThrowError();
    });
  })
  describe('update',() => {
    it('should update an user sucessfully', async () => {
      const body: UpdateUserDto = new UserEntity({
        name: 'user-updated',
        cpf: '123.111.556-14',
        cep: '29000-010',
        publicSpace: 'perto da casinha',
        state: 'SP',
        city: 'São Paulo'
      })
      
      const result = await userController.updateUser('1', body)

      expect(result).toEqual(updatedUserEntity)
      expect(userService.update).toHaveBeenCalledWith('1', body);
    })
    it('should throw an exception', () => {
      const body: UpdateUserDto = new UserEntity({
        name: 'user-updated',
        cpf: '123.111.556-14',
        cep: '29000-010',
        publicSpace: 'perto da casinha',
        state: 'SP',
        city: 'São Paulo'
      })

      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());

      expect(userController.updateUser('1', body)).rejects.toThrowError();
    })
  })

  describe('delete', () => {
    it('should remove a user successfully', async () => {
      const result = await userController.deleteUser('1');

      expect(result).toBeUndefined();
    })
    it('should throw an exception', () => {
      jest.spyOn(userService, 'delete').mockRejectedValueOnce(new Error());

      expect(userController.deleteUser('1')).rejects.toThrowError();
    })
  })
});
