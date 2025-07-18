import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() body: RegisterDto): Promise<User> {
        return this.authService.register(body)
    }

    @Post('login')
    login(@Body() body: LoginDto): Promise<any> {
        return this.authService.login(body)
    }
    @Post('refreshToken')
    async refreshToken(@Body() body: RefreshTokenDto) {
        return this.authService.refreshToken(body.refreshToken);
    }
}
