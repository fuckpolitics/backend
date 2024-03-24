import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {EntityCollection} from "./const";
import {IsEnum, IsString, IsUUID} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export enum DoorType {
    BEAST = 'beast',
    CLASS = 'class',
    RACE = 'race',
}

@Entity(EntityCollection.DOOR)
export class DoorEntity {
    @IsUUID('4')
    @ApiProperty({type: 'string', format: 'uuid'})
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @IsUUID('4')
    @ApiProperty({type: 'string', format: 'uuid'})
    @Column({type: 'uuid'})
    entity_id!: string;

    @IsEnum(() => DoorType)
    @ApiProperty({enum: DoorType})
    @Column({type: 'text'})
    type!: DoorType;
}