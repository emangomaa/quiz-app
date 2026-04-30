import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description:"user name",
    example:"John Doe"
  })
  @IsString()
  name: string;


  @ApiProperty({
    description:"user email",
    example:"john.doe@example.com"
  })
  @IsEmail()
  @IsString()
  email: string;
}