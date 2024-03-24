import {Controller, Get} from '@nestjs/common';
import {CardsService} from "./cards.service";
import { ApiResponse } from '@nestjs/swagger';
import { DoorEntity } from '../entities/door.entity';

@Controller('cards')
export class CardsController {
    constructor(private readonly service: CardsService) {
    }
    @Get()
    @ApiResponse({type: DoorEntity, isArray: true})
    getCards() {
        return this.service.getDoorsDeck();
    }
}
