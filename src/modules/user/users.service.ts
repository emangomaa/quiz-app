import {Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService{

   constructor(
    private readonly userRepo: UserRepository){}

    getAllUsers(){
        return this.userRepo.findAll()
    }

   async createUser(dto:CreateUserDto){
        const hashed = await bcrypt.hash(dto.password, 10);

  const user = this.userRepo.create({
    ...dto,
    password: hashed,
  });
        return user
    }

    getUser( id:number){
        return this.userRepo.findById(id)
    }
}