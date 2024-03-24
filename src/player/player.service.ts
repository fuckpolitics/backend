import {Injectable} from '@nestjs/common';
import {EntityManager, Repository} from "typeorm";
import {PlayerEntity} from "../entities/player.entity";
import {randomUUID} from "crypto";

@Injectable()
export class PlayerService {
    constructor(private readonly manager: EntityManager) {
    }

    async create(game_id: string, user_id: string) {
        await this.manager.delete(PlayerEntity, {user_id});
        const entity: PlayerEntity = await this.manager.save(PlayerEntity, {
            id: randomUUID(),
            game_id,
            level: 1,
            user_id,
        });
        return entity;
    }
}
