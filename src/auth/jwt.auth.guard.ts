import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwt: JwtService) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) throw new UnauthorizedException('Пользователь не авторизован');
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !token)
                throw new UnauthorizedException('Пользователь не авторизован');
            req.user = this.jwt.verify(token, { publicKey: 'secret' });
            return true;
        } catch (e) {``
            throw e;
        }
    }

}