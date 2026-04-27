import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{

    private users = []

    findAll(){
        return this.users
    }

     create(user){
        this.users.push()
        return user
    }
}