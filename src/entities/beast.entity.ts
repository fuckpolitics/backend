import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {EntityCollection} from "./const";
import {IsBoolean, IsNumber, IsObject, IsString, IsUUID} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

@Entity(EntityCollection.BEAST)
export class BeastEntity {
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
    @Column({type: 'int'})
    level!: number;

    @IsNumber()
    @ApiProperty({type: 'number'})
    @Column({type: 'int'})
    treasures!: number;

    @IsBoolean()
    @ApiProperty({type: 'boolean'})
    @Column({type: 'boolean', default: false})
    undead!: boolean;

    @IsString()
    @ApiProperty({type: 'string'})
    @Column({type: 'text', nullable: true})
    field!: string;

    @IsNumber()
    @ApiProperty({type: 'number'})
    @Column({type: 'int', default: 1})
    levels!: number;
}