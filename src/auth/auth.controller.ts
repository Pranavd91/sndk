import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('/register')
    register(@Body() payload: any): Promise<any> {
        return this.authService.register(payload);
    }

    @Post('/login')
    login(@Body() payload: any): Promise<any> {
        return this.authService.login(payload);
    }
}
