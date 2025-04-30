import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GameService } from './game/game.service';
import { GameModule } from './game/game.module';
import { SettingModule } from './setting/setting.module';
import { TeamModule } from './team/team.module';
import { MemberModule } from './member/member.module';
import { PrismaModule } from './prisma/prisma.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GameModule,
    SettingModule,
    TeamModule,
    MemberModule,
    PrismaModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService, GameService],
})
export class AppModule {}
