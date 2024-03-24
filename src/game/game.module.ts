import {Module} from '@nestjs/common';
import {GameController} from './game.controller';
import {GameService} from './game.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {allEntities} from "../entities/all.entities";
import {PlayerModule} from "../player/player.module";
import {CardsModule} from "../cards/cards.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    controllers: [GameController],
    providers: [GameService],
    imports: [TypeOrmModule.forFeature(allEntities), PlayerModule, CardsModule, AuthModule]
})
export class GameModule {
}
