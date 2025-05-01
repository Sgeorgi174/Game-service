import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionService {
  private readonly COOKIE_DOMAIN: string;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  private setCookie(res: Response, value: string) {
    res.cookie('sessionId', value, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
    });
  }

  async getById(id: string) {
    const session = await this.prismaService.session.findUnique({
      where: { id },
      include: {
        teams: true,
        settings: true,
      },
    });

    if (!session) throw new NotFoundException('Сессия не найдена');

    return session;
  }

  async create(res: Response, id: string) {
    try {
      const session = await this.prismaService.session.create({
        data: { gameId: id },
      });
      this.setCookie(res, session.id);
      return session;
    } catch {
      throw new BadRequestException('Неудалось создать сессию');
    }
  }
}
