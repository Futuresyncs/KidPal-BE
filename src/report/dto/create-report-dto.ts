import { IsString, IsNotEmpty, IsArray, ValidateNested, IsInt,IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReportDto {
  @IsInt()
  child_id: number;

  @IsString()
  @IsNotEmpty()
  session_summary: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConversationLogsDto)
  conversation_logs: ConversationLogsDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProgressDataDto)
  progress_data: ProgressDataDto[];
}

export class UpdateReportDto {
  @IsInt()
  @IsOptional()
  child_id?: number;

  @IsString()
  @IsOptional()
  session_summary?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConversationLogsDto)
  @IsOptional()
  conversation_logs?: ConversationLogsDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProgressDataDto)
  @IsOptional()
  progress_data?: ProgressDataDto[];
}

export class ProgressDataDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  date: string;
}

export class ConversationLogsDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
