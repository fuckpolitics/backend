import {Module} from '@nestjs/common';
import {PlayerController} from './player.controller';
import {PlayerService} from './player.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {allEntities} from "../entities/all.entities";

@Module({
    imports: [TypeOrmModule.forFeature(allEntities)],
    controllers: [PlayerController],
    providers: [PlayerService],
    exports: [PlayerService],
})
export class PlayerModule {
}
