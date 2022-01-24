import { Controller, Get, Post, Delete, Put, Body, ParseUUIDPipe, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get()
    async getAllUsers(){
        return await this.userService.findAll()
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
