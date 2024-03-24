import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {
    }

    @Post('login')
    login(@Body() dto: { name: string; password: string }) {
        return this.service.login(dto.name, dto.password);
    }

    @Post('register')
    register(@Body() dto: { name: string; password: string }) {
        return this.service.register( dto.name, dto.password);
    }
}
