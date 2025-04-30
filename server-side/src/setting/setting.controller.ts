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
import { Request } from 'express';
import { CreateSettingDto } from './dto/create-setting.dto';
import { SettingService } from './setting.service';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.settingService.getById(id);
  }

  @Get('/session')
  @HttpCode(HttpStatus.OK)
  async getBySessionId(@Req() req: Request) {
    return await this.settingService.getBySessionId(req);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: Request, @Body() dto: CreateSettingDto) {
    return await this.settingService.create(req, dto);
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: Request,
    @Body() dto: CreateSettingDto,
    @Param('id') id: string,
  ) {
    return await this.settingService.update(req, id, dto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.settingService.delete(id);
  }
}
