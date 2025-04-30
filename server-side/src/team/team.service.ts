import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { Request } from 'express';
import { getSessionId } from 'src/utils/getSessionIdByCookie.utils';

@Injectable()
export class TeamService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: string) {
    const team = await this.prismaService.team.findUnique({
      where: { id },
      include: { members: true },
    });

    if (!team) throw new NotFoundException('Команда не найдена');

    return team;
  }

  async getBySessionId(req: Request) {
    const sessionId = getSessionId(req);
    return await this.prismaService.team.findFirst({ where: { sessionId } });
  }

  async create(req: Request, dto: CreateTeamDto) {
    const sessionId = getSessionId(req);
    const team = await this.prismaService.team.create({
      data: { title: dto.title, sessionId },
    });

    if (!team) throw new BadRequestException('Не удалось создать команду');

    return team;
  }

  async update(req: Request, id: string, dto: CreateTeamDto) {
    const sessionId = getSessionId(req);
    await this.getById(id);

    return await this.prismaService.team.update({
      where: { id },
      data: { title: dto.title, sessionId },
    });
  }

  async delete(id: string) {
    await this.getById(id);
    await this.prismaService.team.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
