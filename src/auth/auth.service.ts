import { Injectable, UnauthorizedException } from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {UserEntity} from "../entities/user.entity";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwt: JwtService) {
    }

    async login(name: string, password: string) {
        const user = await this.validateUser({name, password});
        return this.generateToken(user);
    }

    async register(name: string, password: string) {
        const existing = await this.userService.findByName(name);
        if (existing) throw new Error('The same user already exists');
        const hash = await bcrypt.hash(password, 5);
        const user = await this.userService.create({name, password: hash});
        return this.generateToken(user);
    }

    private generateToken(user: UserEntity) {
        const payload = {id: user.id, name: user.name, password: user.password}
        return {token: this.jwt.sign(payload)};
    }

    private async validateUser(param: { password: string; name: string }) {
        const user = await this.userService.findByName(param.name);
        console.log (param);
        if (!user) throw new Error('User not found');
        const passwordEquals = bcrypt.compare(param.password, user.password);
        if (passwordEquals) return user;
    }

    async validate(jwtToken: string) {
        if (!jwtToken)
            throw new UnauthorizedException('Пользователь не авторизован');
        const user = this.jwt.verify(jwtToken, {publicKey: 'secret'});
        return await this.validateUser(user);
    }
}
