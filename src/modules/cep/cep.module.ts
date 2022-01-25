import { Module } from '@nestjs/common';
import { CepService } from './cep.service';
import { CepController } from './cep.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CepEntity } from './entities/cep.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CepEntity, ])],
  controllers: [CepController],
  providers: [CepService],
  exports: [CepService]
})
export class CepModule {}
