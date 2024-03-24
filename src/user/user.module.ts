import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {allEntities} from "../entities/all.entities";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [TypeOrmModule.forFeature(allEntities)],
    exports: [UserService]
})
export class UserModule {
}
