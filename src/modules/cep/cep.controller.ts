import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CepService } from './cep.service';
import { CreateCepDto } from './dto/create-cep.dto';
@Controller('api/cep')
@ApiTags('Ceps')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Get(':cep')
  @ApiOperation({ summary: 'Retorna o cep'})
  @ApiResponse({ status: 200, description: 'CEP retornado com sucesso' })
  @ApiResponse({ status: 404, description: 'CEP não foi encontrado' })
  async findOne(@Param('cep') cep: string) {
    return await this.cepService.findCep(cep);
  }

}
