import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import {JwtAuthGuard} from "./jwt.auth.guard";

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [UserModule,
        JwtModule.register({privateKey: 'secret', signOptions: {expiresIn: '24h'}})],
    exports: [AuthService, JwtModule]
})
export class AuthModule {
}
