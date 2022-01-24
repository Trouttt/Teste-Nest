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

}
