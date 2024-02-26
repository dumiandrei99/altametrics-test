import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { LoginDTO } from 'src/dtos/login.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    @Post('/login')
    async login(@Body() loginDto: LoginDTO): Promise<{ access_token: string }> {
        const user = await this.userService.checkCredentials(loginDto.email, loginDto.password);
        
        if (!user) {
        throw new UnauthorizedException('Wrong username or password.');
        }
        
        const access_token = await this.authService.generateJwt(user);
        
        return { access_token };
    }
}
