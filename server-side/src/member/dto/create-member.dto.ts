import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMemberDto {
  @IsString({ message: 'Имя участника должно быть строкой' })
  @IsNotEmpty({ message: 'Имя участника должно быть указано обязательно' })
  name: string;

  @IsUUID()
  teamId: string;
}
