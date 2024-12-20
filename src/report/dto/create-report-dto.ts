import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class EndSessionDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  time: number; // Time in seconds

  @IsString()
  @IsNotEmpty()
  date: string;
}
