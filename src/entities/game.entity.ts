import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EntityCollection} from "./const";
import {IsString, IsUUID} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {PlayerEntity} from "./player.entity";

export enum GameStatus {
    WAITING = 'waiting',
    ACTIVE = 'active',
    FINISHED = 'finished',
}

@Entity(EntityCollection.GAME)
export class GameEntity {
    @IsUUID('4')
    @ApiProperty({type: 'string', format: 'uuid'})
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToMany(() => PlayerEntity, (p) => p.game_id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'id'})
    players!: PlayerEntity[]

    @IsString()
    @ApiProperty({type: 'string'})
    @Column({type: 'text'})
    status!: GameStatus;
}