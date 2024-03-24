import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CardsModule} from './cards/cards.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {allEntities} from "./entities/all.entities";
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { PlayerModule } from './player/player.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';

@Module({
    controllers: [AppController],
    providers: [AppService, AppGateway],
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        username: 'postgres',
        password: 'changeme',
        port: 5432,
        database: 'manchkin',
        entities: allEntities,
        synchronize: true
    }), CardsModule, GameModule, UserModule, PlayerModule, AuthModule]
})
export class AppModule {
}
