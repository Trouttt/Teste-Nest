import { Test, TestingModule } from '@nestjs/testing';
import { CepController } from './cep.controller';
import { CepService } from './cep.service';
import { CreateCepDto } from './dto/create-cep.dto';
import { CepEntity } from './entities/cep.entity';

const newCepEntity: CepEntity = new CepEntity({
  cep: '27999-999', publicSpace: 'atrás da praça', state: 'SP', city: 'São Paulo'
})

describe('CepController', () => {
  let cepController: CepController;
  let cepService: CepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CepController],
      providers: [  {
        provide: CepService,
        useValue: {
          create: jest.fn().mockResolvedValue(newCepEntity),
          findCep: jest.fn().mockResolvedValue(newCepEntity),
        }
      }],
    }).compile();



    cepController = module.get<CepController>(CepController);
    cepService = module.get<CepService>(CepService);
  });

  it('should be defined', () => {
    expect(cepController).toBeDefined();
  });


  describe('findOne', () => {
    it('should return a cep sucessfully', async () => {
      const result = await cepController.findOne('27999-999');

      expect(result).toEqual(newCepEntity);
      expect(typeof result).toEqual('object');
    });
    it('should throw an expection', () => {
      jest.spyOn(cepService, 'findCep').mockRejectedValueOnce(new Error());

      expect(cepController.findOne('27998-000')).rejects.toThrowError();
    });
  })
});
