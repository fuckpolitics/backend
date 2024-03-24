import { Injectable } from '@nestjs/common';
import {EntityManager, Repository} from "typeorm";
import {UserEntity} from "../entities/user.entity";

@Injectable()
export class UserService {
    repo: Repository<UserEntity>
    constructor(private readonly manager: EntityManager) {
        this.repo = this.manager.getRepository(UserEntity);
    }

    findOne(id: string) {
        return this.repo.findOneBy({id});
    }

    findByName(name: string) {
        return this.repo.findOneBy({name});
    }

    create(data: {name: string; password: string;}): Promise<UserEntity> {
        return this.repo.save(data);
    }
}
