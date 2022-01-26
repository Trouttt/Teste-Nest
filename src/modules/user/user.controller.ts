import { Controller, Get, Post, Delete, Put, Body, ParseUUIDPipe, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    async getAllUsers(){
        return await this.userService.findAll()
    }

    @Get(':cpf')
    async getUserByCpf(@Param('cpf') cpf:string){
        return await this.userService.findUserByCpf(cpf);
    }

    @Post()
    async createUser(@Body() body: CreateUserDto){
        return await this.userService.create(body); 
    }

    
    @Put(':id')
    async updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto){
        return await this.userService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param('id', new ParseUUIDPipe()) id:string){
        await this.userService.delete(id);
    }
}
