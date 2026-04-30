import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entity/user.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers:[UserService , UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}
