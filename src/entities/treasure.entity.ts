import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {EntityCollection} from "./const";
import {IsBoolean, IsNumber, IsOptional, IsString, IsUUID} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export enum TreasureType {
    OTHER = 'other',
    HEAD = 'head',
    RIGHT_HAND = 'right_hand',
    LEFT_HAND = 'left_hand',
    LEGS = 'legs',
}

@Entity(EntityCollection.TREASURE)
export class TreasureEntity {
    @IsUUID('4')
    @ApiProperty({type: 'string', format: 'uuid'})
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @IsString()
    @ApiProperty({type: 'string'})
    @Column({type: 'text'})
    name!: string;

    @IsNumber()
    @ApiProperty({type: 'number'})
    @Column({type: 'int', nullable: true})
    price?: number;

    @IsBoolean()
    @ApiProperty({type: 'boolean'})
    @Column({type: 'boolean'})
    wearable!: boolean;

    @IsString()
    @ApiProperty({type: 'string'})
    @Column({type: 'text'})
    field!: string;

    @IsString()
    @ApiProperty({type: 'string'})
    @Column({type: 'text'})
    type!: TreasureType;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({type: 'number'})
    @Column({type: 'int', nullable: true, default: 0})
    level: number;
}