import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
export class SignUpUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
}
export class LogInUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEmail()
  email: string;
}

export class ForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
