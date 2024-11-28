import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateChildProfileDto {
  @IsInt()
  @IsNotEmpty()
  parent_id: number;

  @IsString()
  @IsNotEmpty()
  nickName: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  character_id: string;
}
