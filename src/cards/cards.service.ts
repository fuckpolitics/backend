import { Injectable } from '@nestjs/common';
import {EntityManager} from "typeorm";
import {BeastEntity} from "../entities/beast.entity";
import {TreasureEntity} from "../entities/treasure.entity";
import {DoorEntity} from "../entities/door.entity";

@Injectable()
export class CardsService {
    constructor(private readonly manager: EntityManager) {
    }
    getDoorsDeck() {
        return this.manager.find(DoorEntity);
    }

    getTreasuresDeck() {
        return this.manager.find(TreasureEntity);
    }
}
