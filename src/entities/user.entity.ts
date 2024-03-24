import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {EntityCollection} from "./const";
import {IsString, IsUUID} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

@Entity(EntityCollection.USER)
export class UserEntity {
    @IsUUID('4')
    @ApiProperty({type: 'string', format: 'uuid'})
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @IsString()
    @ApiProperty({type: 'string'})
    @Column({type: 'text'})
    name!: string;

    @IsString()
    @ApiProperty({type: 'string'})
    @Column({type: 'text'})
    password!: string;
}