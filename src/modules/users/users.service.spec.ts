import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { UsersService } from './users.service';

const updatedUserEntity: UserEntity = new UserEntity({
  name: 'user-updated',
  cpf: '120.559.770-08',
  cep: '29000-010',
  publicSpace: 'perto da casinha',
  state: 'SP',
  city: 'São Paulo'
})


const userEntityList: UserEntity[] = [
  new UserEntity({ id: '1', name: 'user-1', cpf: '505.116.180-42', cep: '27998-999', publicSpace: 'atrás da praça', state: 'SP', city: 'São Paulo', }),
  new UserEntity({ id: '2', name: 'user-2', cpf: '321.125.765-98', cep: '12354-123', publicSpace: 'perto da igreja', state: 'RJ', city: 'Rio de Janeiro', }),
  new UserEntity({ id: '3', name: 'user-3', cpf: '124.765.236-12', cep: '64433-512', publicSpace: 'em frente ao quiosque', state: 'MG', city: 'Cabiunas', }),
]

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: Repository<UserEntity>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getRepositoryToken(UserEntity),
        useValue: {
          findOneOrFail: jest.fn().mockResolvedValue(userEntityList[0]),
          find:jest.fn().mockResolvedValue(userEntityList),
          save:jest.fn().mockResolvedValue(userEntityList[0]),
          create:jest.fn().mockReturnValue(userEntityList[0]),
          merge:jest.fn().mockReturnValue(userEntityList[0]),
          softDelete:jest.fn().mockReturnValue(undefined),
        }
      }],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });
  describe('findAll', () => {
    it('should return a user entity list successfully', async () => {
      const result = await userService.findAll();

      expect(result).toEqual(userEntityList);
      expect(userRepository.find).toHaveBeenCalledTimes(1);

    })
    it('should throw an expection', () => {
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());

      expect(userService.findAll).rejects.toThrowError();
    })
  })

  describe('findOne', () => {
    it('should return a todo item successfully', async () => {
      const result = await userService.findOne('1')

      expect(result).toEqual(userEntityList[0]);
      expect(userRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    })

    it('should throw a not found expection', () => {
      jest.spyOn(userRepository, 'findOneOrFail').mockRejectedValueOnce(new Error());

      expect(userService.findOne('1')).rejects.toThrowError(NotFoundException);
    })
  })


  describe('create', () => {
    it('should create a new todo entity item successfully', async () => {
      const data: CreateUserDto = {
        name: 'user-1', cpf: '120.559.770-08', cep: '27998-999', publicSpace: 'atrás da praça', state: 'SP', city: 'São Paulo', 
      }
      const result = await userService.create(data);

      expect(result).toEqual(userEntityList[0]);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an expection', () => {
      const data: CreateUserDto = {
        name: 'user-1', cpf: '123.456.789-96', cep: '27998-999', publicSpace: 'atrás da praça', state: 'SP', city: 'São Paulo', 
      }

      jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error());
      
      expect(userService.create(data)).rejects.toThrowError();
    })
    it('should throw an expection if cpf is not valid', () => {
      const data: CreateUserDto = {
        name: 'user-1', cpf: '120.456.789-96', cep: '27998-999', publicSpace: 'atrás da praça', state: 'SP', city: 'São Paulo', 
      }

      jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error());
      
      expect(userService.create(data)).rejects.toThrowError(BadRequestException);
    })
    it('should throw an expection if cpf is already registered', () => {
      const data: CreateUserDto = {
        name: 'user-1', cpf: '505.116.180-42', cep: '27998-999', publicSpace: 'atrás da praça', state: 'SP', city: 'São Paulo', 
      }

      jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error());
      
      expect(userService.create(data)).rejects.toThrowError(BadRequestException);
    })

  })

});
