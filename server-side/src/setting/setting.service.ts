import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { getSessionId } from 'src/utils/getSessionIdByCookie.utils';
import { CreateSettingDto } from './dto/create-setting.dto';

@Injectable()
export class SettingService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: string) {
    const setting = await this.prismaService.setting.findUnique({
      where: { id },
    });

    if (!setting) throw new NotFoundException('Настройка не найдена');

    return setting;
  }

  async getBySessionId(req: Request) {
    const sessionId = getSessionId(req);

    return await this.prismaService.setting.findFirst({ where: { sessionId } });
  }

  async create(req: Request, dto: CreateSettingDto) {
    const sessionId = getSessionId(req);
    const { duration, scoreForWins, isDec } = dto;
    const setting = await this.prismaService.setting.create({
      data: { duration, scoreForWins, isDec, sessionId },
    });

    if (!setting) throw new BadRequestException('Не удалось создать настройку');

    return setting;
  }

  async update(req: Request, id: string, dto: CreateSettingDto) {
    const sessionId = getSessionId(req);
    const { duration, scoreForWins, isDec } = dto;
    await this.getById(id);

    return await this.prismaService.setting.update({
      where: { id },
      data: { duration, scoreForWins, isDec, sessionId },
    });
  }

  async delete(id: string) {
    await this.getById(id);
    await this.prismaService.setting.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
