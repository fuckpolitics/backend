import {Module} from '@nestjs/common';
import {CardsService} from './cards.service';
import {CardsController} from './cards.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {allEntities} from "../entities/all.entities";

@Module({
    providers: [CardsService],
    controllers: [CardsController],
    imports: [TypeOrmModule.forFeature(allEntities)],
    exports: [CardsService]
})
export class CardsModule {
}
