import { Controller, Get, Post, Delete, Put, Body, ParseUUIDPipe, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserService } from './user.service';

@Controller('api/users')
@ApiTags('Users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    @ApiOperation({ summary: 'Retorna todos os usuários'})
    @ApiResponse({ status:200, description: 'Lista de usuários',  })
    async getAllUsers(){
        return await this.userService.findAll()
    }

    @Get(':cpf')
    @ApiOperation({ summary: 'Retorna o usuário pelo CPF'})
    @ApiResponse({ status: 200, description: 'Lista de tarefas', })
    @ApiResponse({ status: 404, description: 'Não encontrou o usuário com esse CPF'})
    async getUserByCpf(@Param('cpf') cpf:string){
        return await this.userService.findUserByCpf(cpf);
    }

    @Post()
    @ApiOperation({ summary: 'Cria um novo usuário'})
    @ApiResponse({ status: 201, description: 'Novo usuário criado com sucesso', })
    @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
    async createUser(@Body() body: CreateUserDto){
        return await this.userService.create(body); 
    }

    
    @Put(':id')
    @ApiOperation({ summary: 'Atualiza um usuário já existente'})
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso',})
    @ApiResponse({ status: 404, description: 'Usuário não foi encontrado' })
    async updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto){
        return await this.userService.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove um usuário já existente'})
    @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
    @ApiResponse({ status: 404, description: 'Usuário não foi encontrado' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param('id', new ParseUUIDPipe()) id:string){
        await this.userService.delete(id);
    }
}
