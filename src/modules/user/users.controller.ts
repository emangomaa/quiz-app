import { Body, Controller, Get, Post,Param } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')

export class UserController {
    constructor( private readonly userService : UserService){}   // dependancy injection DI


    @Get()
    @ApiResponse({
         status: 200,   
         description: 'List of all users.',
    })
    getUsers(){
       return this.userService.getAllUsers()
    }
    @Get(':id')
     @ApiResponse({
         status: 200,   
         description: 'The user has been successfully retrieved.',
    })
    getUser(@Param('id') id: number){
       return this.userService.getUser(id)
    }

    @Post()
    @ApiResponse({
         status: 201,   
         description: 'The user has been successfully created.',
    })

    createUser(@Body() dto:CreateUserDto){
       return this.userService.createUser(dto)
    }

}