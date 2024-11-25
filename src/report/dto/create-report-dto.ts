import { IsString, IsNotEmpty, IsArray } from 'class-validator';
export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  child_id: string;
  @IsString()
  @IsNotEmpty()
  session_summary: string;
  @IsArray()
  conversation_logs: conversationLogsDto[];
  @IsArray()
  progress_data: ProgressDataDto[];
}

class ProgressDataDto {
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
class conversationLogsDto {
  @IsString()
  @IsNotEmpty()
  question: string;
  @IsString()
  @IsNotEmpty()
  answer: string;
}
