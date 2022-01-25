import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CepService } from './cep.service';
import { CreateCepDto } from './dto/create-cep.dto';
import { CepEntity } from './entities/cep.entity';

const foundedCepEntity: CepEntity = new CepEntity({
  cep: '59633-680', publicSpace: 'atrás da praça', state: 'SP', city: 'São Paulo'
})
const cepEntityList: CepEntity[] = [
  new CepEntity({ cep: '27998-000', publicSpace: 'atrás da praça', state: 'SP', city: 'São Paulo', }),
  new CepEntity({ cep: '12354-123', publicSpace: 'perto da igreja', state: 'RJ', city: 'Rio de Janeiro', }),
  new CepEntity({ cep: '64433-512', publicSpace: 'em frente ao quiosque', state: 'MG', city: 'Cabiunas', }),
]

describe('CepService', () => {
  let cepService: CepService;
  let cepRepository: Repository<CepEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CepService, {
        provide: getRepositoryToken(CepEntity),
        useValue: {
          findOne: jest.fn().mockResolvedValue(cepEntityList[0]),
          save:jest.fn().mockResolvedValue(cepEntityList[0]),
          create:jest.fn().mockReturnValue(cepEntityList[0]),
        }
      }]
    }).compile();
    
    cepService = module.get<CepService>(CepService);
    cepRepository = module.get<Repository<CepEntity>>(getRepositoryToken(CepEntity))
  });

  it('should be defined', () => {
    expect(cepService).toBeDefined();
    expect(cepRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cep entity item successfully', async () => {
      const data: CreateCepDto = { cep: '27998-999', publicSpace: 'atrás da praça', state: 'SP', city: 'São Paulo', };

      const result = await cepService.create(data);

      expect(result).toEqual(cepEntityList[0]);
      expect(cepRepository.create).toHaveBeenCalledTimes(1);
      expect(cepRepository.save).toHaveBeenCalledTimes(1);
    })
    it('should throw an expection', async () => {
      const data: CreateCepDto = {
        cep: '27999-999', publicSpace: 'atrás da praça', state: 'SP', city: 'São Paulo',
      }

      jest.spyOn(cepRepository, 'save').mockRejectedValueOnce(new Error());
      
      expect(cepService.create(data)).rejects.toThrowError(BadRequestException);
    })
  })

  describe('findCep', () => {
    it('should return a cep item successfully if exists in database', async () => {
      const result = await cepService.findCep('27998-000')

      const newCepEntity: CepEntity = new CepEntity({
        cep: '27998-000', publicSpace: 'atrás da praça', state: 'SP', city: 'São Paulo'
      })

      expect(typeof result).toEqual('object');
      expect(cepRepository.create).toHaveBeenCalledTimes(0);
      expect(cepRepository.save).toHaveBeenCalledTimes(0);
    })
  })
  it('should throw an expection', async () => {
    const data: CreateCepDto = {
      cep: '27999-999', publicSpace: 'atrás da praça', state: 'SP', city: 'São Paulo',
    }

    jest.spyOn(cepRepository, 'save').mockRejectedValueOnce(new Error());
    
    expect(cepService.create(data)).rejects.toThrowError(BadRequestException);
    
  })
});
