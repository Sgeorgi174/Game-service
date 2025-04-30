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
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.memberService.getById(id);
  }

  @Get('by-teamId/:id')
  @HttpCode(HttpStatus.OK)
  async getBySessionId(@Param('id') teamId: string) {
    return await this.memberService.getByTeamId(teamId);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateMemberDto) {
    return await this.memberService.create(dto);
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Body() dto: CreateMemberDto, @Param('id') id: string) {
    return await this.memberService.update(id, dto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.memberService.delete(id);
  }
}
