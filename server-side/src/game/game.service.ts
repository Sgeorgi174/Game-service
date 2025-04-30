import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: string) {
    const game = await this.prismaService.game.findUnique({
      where: {
        id,
      },
    });

    if (!game) throw new NotFoundException('Игра не найдена');

    return game;
  }

  async getAll() {
    const games = await this.prismaService.game.findMany();

    if (!games) throw new NotFoundException('Список игр пуст');

    return games;
  }

  async create(dto: CreateGameDto) {
    const { title, description } = dto;

    const game = await this.prismaService.game.create({
      data: {
        title,
        description,
      },
    });

    return game;
  }

  async update(id: string, dto: UpdateGameDto) {
    await this.getById(id);

    const { title, description } = dto;

    const game = await this.prismaService.game.update({
      where: { id },
      data: { title, description },
    });

    return game;
  }

  async delete(id: string) {
    await this.getById(id);

    await this.prismaService.game.delete({
      where: {
        id,
      },
    });

    return { status: true };
  }
}
