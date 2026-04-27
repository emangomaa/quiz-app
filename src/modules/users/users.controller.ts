import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')

export class UserController {
    constructor( private readonly userService : UserService){}   // dependancy injection DI


    @Get()
    getUsers(){
       return this.userService.findAll()
    }

    @Post()
    createUser(@Body() dto:CreateUserDto){
       return this.userService.create(dto)
    }

}