import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description:"user name"
  })
  @IsString()
  name: string;


  @ApiProperty()
  @IsEmail()
  email: string;
}