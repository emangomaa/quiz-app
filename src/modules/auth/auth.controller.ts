
import { Module ,Controller,Post, Body, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersModule } from '../user/users.module';
import { ApiStandardResponses } from '../../common/decorators/api.response.decorator';

@Module({
    imports: [UsersModule],
    controllers: [AuthController],  
    providers: [AuthService],
})

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService, 
       ) {
        console.log("AuthController initialized");
    }  


    @Post('login')
    @ApiStandardResponses(LoginDto, {
          ok: true,
          badRequest: true,
          unauthorized: true,
        InValidUser: true,
          })
    login(@Body() login:LoginDto){
        return this.authService.login(login);
    }
}