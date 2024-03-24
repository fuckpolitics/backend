import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EntityManager } from 'typeorm';
import { PlayerService } from '../player/player.service';
import { GameEntity, GameStatus } from '../entities/game.entity';
import { CardsService } from '../cards/cards.service';
import { Game } from './game';
import { PlayerEntity } from '../entities/player.entity';
import { Transactional } from 'typeorm-transactional/dist/decorators/transactional';

@Injectable()
export class GameService {
  constructor(private readonly manager: EntityManager,
              private readonly playerService: PlayerService,
              private readonly cardService: CardsService) {
  }

  async create(userId: string) {
    const gameId = randomUUID();
    await this.manager.save(GameEntity, { id: gameId, status: GameStatus.WAITING });
    await this.playerService.create(gameId, userId);
    return gameId;
  }

  find() {
    return this.manager.findOneBy(GameEntity, { status: GameStatus.WAITING });
  }

  async join(id: string, userId: string) {
    const player = await this.playerService.create(id, userId);
    return player.id;
  }


  @Transactional()
  async start(id: string) {
    const [entity, players] =
      await Promise.all([this.manager.findOneBy(GameEntity, { id }),
        this.manager.findBy(PlayerEntity, { game_id: id })]);
    if (entity.status !== GameStatus.WAITING) throw new Error('Game was already started');
    await this.manager.update(GameEntity, { id }, { status: GameStatus.ACTIVE });
    const doors = await this.cardService.getDoorsDeck();
    const treasures = await this.cardService.getTreasuresDeck();
    const game = new Game(players, doors, treasures, this.manager);
  }
}
