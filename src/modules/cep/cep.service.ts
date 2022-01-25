import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ViaCepRequisition } from '../../utils/viacep';
import { Repository } from 'typeorm';
import { CreateCepDto } from './dto/create-cep.dto';
import { CepEntity } from './entities/cep.entity';

@Injectable()
export class CepService {
  constructor(@InjectRepository(CepEntity) private readonly cepRepository: Repository<CepEntity>){

  }
  async create(createCepDto: CreateCepDto) {
    try{
      if(createCepDto.cep.length != 9 ){
        throw new Error();
      }

      const data: CreateCepDto = {
        cep: createCepDto.cep,
        publicSpace: createCepDto.publicSpace,
        state: createCepDto.state,
        city: createCepDto.city,
      };
  
      return await this.cepRepository.save(this.cepRepository.create(data));
    } catch (error) {
      throw new BadRequestException(error.message = 'CEP is invalid');
    }
    
  }


  async findCep(cep: string) {
    try{
      const cepFound = await this.cepRepository.findOne({cep});
      
      if(cepFound){

        return cepFound
      } else {

        const cepRequisited = ViaCepRequisition(cep);
        if(!cepRequisited){
          throw new Error();
        }
        return await this.create(await cepRequisited);
      }
    } catch  (error)  {
      throw new NotFoundException(error.message = "CEP don't exist");
    }
  }
}
