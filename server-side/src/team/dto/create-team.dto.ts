import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateTeamDto {
  @IsString({ message: 'Название команды должно быть строкой' })
  @IsNotEmpty({ message: 'Название команды должно быть указано обязательно' })
  title: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  @IsInt({ message: 'Должно быть целым числом' })
  @IsPositive({ message: 'Должно быть положительным числом' })
  @Min(0, { message: 'Минимальное значение: 0' })
  points?: number;
}
