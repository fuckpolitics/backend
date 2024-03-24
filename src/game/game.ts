import {PlayerEntity} from "../entities/player.entity";
import {DoorEntity} from "../entities/door.entity";
import {TreasureEntity} from "../entities/treasure.entity";
import {mapBy} from "../helper";
import {Player} from "src/player/player";
import {BeastEntity} from "src/entities/beast.entity";
import {EntityManager} from "typeorm";

export class Game {
    private doorsMap: Map<string, DoorEntity>;
    private treasuresMap: Map<string, TreasureEntity>;
    private finished = false;
    private players: Player[] = [];

    constructor(players: PlayerEntity[],
                private readonly doors: DoorEntity[],
                private readonly treasures: TreasureEntity[],
                private readonly manager: EntityManager) {
        this.players = players.map(p => Player.fromEntity(p, this));
        this.doorsMap = mapBy(doors, d => d.id);
        this.treasuresMap = mapBy(treasures, t => t.id);
        this.start();
    }

    private giveCards(playerId: string, options: Partial<{ doors: number, treasures: number }>) {
        const player = this.players.find(p => p.id === playerId);
        Object.entries(options)
            .forEach(([key, value]) =>
                player.cards.push(...this[key].splice(0, value).map(d => d.id)))
    }

    openDoor() {
        return this.doors.shift();
    }

    getTreasure(id: string) {
        return this.treasuresMap.get(id);
    }

    getDoor(id: string) {
        return this.doorsMap.get(id);
    }

    getBeast(id: string) {
        return this.manager.findOneBy(BeastEntity, {id})
    }

    start() {
        this.players.forEach(p => this.giveCards(p.id, {treasures: 4, doors: 4}));
    }
}