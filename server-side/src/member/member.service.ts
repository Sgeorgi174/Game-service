import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MemberService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: string) {
    const member = await this.prismaService.member.findUnique({
      where: { id },
    });

    if (!member) throw new NotFoundException('Участник не найден');

    return member;
  }

  async getByTeamId(teamId: string) {
    const members = await this.prismaService.member.findMany({
      where: {
        teamId,
      },
    });

    if (!members) throw new NotFoundException('Список участников пуст');

    return members;
  }

  async create(dto: CreateMemberDto) {
    const member = await this.prismaService.member.create({
      data: { name: dto.name, teamId: dto.teamId },
    });

    if (!member) throw new BadRequestException('Не удалось создать участника');

    return member;
  }

  async update(id: string, dto: CreateMemberDto) {
    await this.getById(id);

    return await this.prismaService.member.update({
      where: { id },
      data: { name: dto.name, teamId: dto.teamId },
    });
  }

  async delete(id: string) {
    await this.getById(id);
    await this.prismaService.member.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
