import {PlayerEntity} from "../entities/player.entity";
import {TreasureType} from "src/entities/treasure.entity";
import {Game} from "../game/game";

export type PlayerWearing = Partial<{ [k in (typeof TreasureType)[keyof typeof TreasureType]]: k extends TreasureType.OTHER ? string[] : string }>

export class Player {
    class?: string;
    race?: string;
    level: 1;
    cards: string[] = [];
    backpack: string[] = [];
    wearing: PlayerWearing = {};
    damage = 1;
    inFight = false;

    constructor(readonly id: string, readonly userId: string, readonly gameId: string, private readonly game: Game) {
    }

    static fromEntity(entity: PlayerEntity, game: Game) {
        return new Player(entity.id, entity.user_id, entity.game_id, game)
    }

    wear(id: string) {
        if (this.inFight) throw new Error('You can not wear anything during the fight');
        if (!this.cards.includes(id)) throw new Error('You do not have this card');
        const card = this.game.getTreasure(id);
        if (!card) throw new Error('The card not found');
        if (!card.wearable) throw new Error('You can not wear this item');
        if (this.wearing[card.type] && card.type !== TreasureType.OTHER) {
            this.backpack.push(id);
            this.damage -= card.level;
        }
        if (card.type === TreasureType.OTHER)
            this.wearing[card.type] = [...(this.wearing[card.type] || []), id];
        else this.wearing[card.type] = id;
        this.damage += card.level;
    }

    openDoor() {
        this.game.openDoor();
    }
}