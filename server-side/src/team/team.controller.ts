import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { Request } from 'express';
import { CreateTeamDto } from './dto/create-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.teamService.getById(id);
  }

  @Get('session')
  @HttpCode(HttpStatus.OK)
  async getBySessionId(@Req() req: Request) {
    return await this.teamService.getBySessionId(req);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: Request, @Body() dto: CreateTeamDto) {
    return await this.teamService.create(req, dto);
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: Request,
    @Body() dto: CreateTeamDto,
    @Param('id') id: string,
  ) {
    return await this.teamService.update(req, id, dto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.teamService.delete(id);
  }
}
