import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {EntityCollection} from "./const";
import {IsArray, IsNumber, IsOptional, IsString, IsUUID} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {UserEntity} from "./user.entity";

@Entity(EntityCollection.PLAYER)
export class PlayerEntity {
    @IsUUID('4')
    @ApiProperty({type: 'string', format: 'uuid'})
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @IsString()
    @ApiProperty({type: 'string'})
    @Column({type: 'text'})
    user_id!: string;

    @OneToOne(() => UserEntity, (u) => u.id, {
        onDelete: 'CASCADE',
      })
      @JoinColumn({ name: 'user_id' })
    user?: UserEntity;

    @IsString()
    @ApiProperty({type: 'string'})
    @Column({type: 'text'})
    game_id!: string;
}