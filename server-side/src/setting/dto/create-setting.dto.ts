import { IsBoolean, IsInt, IsPositive } from 'class-validator';

export class CreateSettingDto {
  @IsInt()
  @IsPositive()
  duration: number;

  @IsInt()
  @IsPositive()
  scoreForWins: number;

  @IsBoolean()
  isDec: boolean;
}
