import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CepService } from './cep.service';
import { CepEntity } from './entities/cep.entity';

const cepEntityList: CepEntity[] = [
  new CepEntity({ id: '1',  cep: '27998-999', publicSpace: 'atrás da praça', state: 'SP', city: 'São Paulo', }),
  new CepEntity({ id: '2',  cep: '12354-123', publicSpace: 'perto da igreja', state: 'RJ', city: 'Rio de Janeiro', }),
  new CepEntity({ id: '3',  cep: '64433-512', publicSpace: 'em frente ao quiosque', state: 'MG', city: 'Cabiunas', }),
]

describe('CepService', () => {
  let cepService: CepService;
  let cepRepository: Repository<CepEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CepService, {
        provide: getRepositoryToken(CepEntity),
        useValue: {
          findOneOrFail: jest.fn().mockResolvedValue(cepEntityList[0]),
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
});
