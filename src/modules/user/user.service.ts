import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { cpf } from 'cpf-cnpj-validator'; 

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){

    }

    async findUserByCpf(cpf: string){
        try{
            return await this.userRepository.findOneOrFail(({ cpf }));
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }


    async findOne(id: string) {
        try{
            return await this.userRepository.findOneOrFail(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
    async findAll() {
        return await this.userRepository.find({ select: ['id', 'name', 'cep', 'cpf', 'publicSpace', 'state', 'city', 'createdAt', 'updatedAt', 'deletedAt' ]});
    }

    async create(data: CreateUserDto) {
        try{
            if(cpf.isValid(data.cpf)){
                console.log(data);
                return await this.userRepository.save(this.userRepository.create(data))
            } else {
                throw new Error();
            }
        } catch(error){
            throw new BadRequestException(error.message = `${cpf.isValid(data.cpf) == true ? 'CPF is already exist' : error.message}`);        
        }
    }

    async update(id: string,data: UpdateUserDto) {
        const user = await this.findOne(id);
        this.userRepository.merge(user, data);
        return await this.userRepository.save(user);
    }

    async delete(id:string) {
        await this.findOne(id);
        await this.userRepository.softDelete(id);
    }

    
}
