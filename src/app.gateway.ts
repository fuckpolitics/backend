import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Namespace, Server } from 'socket.io';
import { AuthService } from './auth/auth.service';
import { UserEntity } from './entities/user.entity';
import { SocketUserToken } from './helper';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private authService: AuthService) {
    }

    private users: UserEntity[] = [];

    @WebSocketServer() server: Namespace;

    @SubscribeMessage('wear')
    async handleSendMessage(client: Socket, payload: any, @SocketUserToken() token: string): Promise<void> {
        const user = await this.authService.validate(token);
        console.log(123, user)
        this.users.push(user);
        this.server.emit('recMessage', payload);
    }

    afterInit(server: Server) {
        console.log(server);
        //Выполняем действия
    }

    handleDisconnect(client: Socket) {
        console.log(`Disconnected: ${client.id}`);
        //Выполняем действия
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(client);
        console.log(`Connected ${client.id}`);
        //Выполняем действия
    }
}