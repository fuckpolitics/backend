import {Controller, Get, Param, ParseUUIDPipe, Post, UseGuards} from '@nestjs/common';
import {GameService} from "./game.service";
import {JwtAuthGuard} from "../auth/jwt.auth.guard";
import {User} from "../helper";

@UseGuards(JwtAuthGuard)
@Controller('game')
export class GameController {
    constructor(private readonly service: GameService) {
    }

    @Post('create')
    create(@User('id') userId: string) {
        return this.service.create(userId);
    }

    @Get('find')
    find() {
        return this.service.find();
    }

    @Get(':id/join')
    join(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @User('id') userId: string) {
        return this.service.join(id, userId);
    }

    @Get(':id/start')
    start(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
        return this.service.start(id);
    }
}
