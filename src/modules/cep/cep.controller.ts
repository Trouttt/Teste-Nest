import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CepService } from './cep.service';
import { CreateCepDto } from './dto/create-cep.dto';
@Controller('api/cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Get(':cep')
  async findOne(@Param('cep') cep: string) {
    return await this.cepService.findCep(cep);
  }

}
