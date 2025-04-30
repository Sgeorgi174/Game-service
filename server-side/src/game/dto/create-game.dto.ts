import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString({ message: 'Название игры должно быть строкой' })
  @IsNotEmpty({ message: 'Название игры должно быть указано обязательно' })
  title: string;

  @IsString({ message: 'Описание игры должно быть строкой' })
  @IsNotEmpty({ message: 'Описание игры должно быть указано обязательно' })
  description: string;

  @IsOptional()
  @IsArray({ message: 'Команды должны приходить массивом' })
  teams?: object[];

  @IsOptional()
  @IsArray({ message: 'Настройки должны приходить массивом' })
  settings?: object[];
}
