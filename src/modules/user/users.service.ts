import {Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService{

   constructor(private readonly userRepo: UserRepository){}

    getAllUsers(){
        return this.userRepo.findAll()
    }

    createUser(dto:CreateUserDto){
        
        return this.userRepo.create(dto)
    }

    getUser( id:number){
        return this.userRepo.findById(id)
    }
}