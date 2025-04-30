import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { Response } from 'express';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.sessionService.getById(id);
  }

  @Post('create/:id')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Res({ passthrough: true }) res: Response,
    @Param('id') gameId: string,
  ) {
    return await this.sessionService.create(res, gameId);
  }
}
