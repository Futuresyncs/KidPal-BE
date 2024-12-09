import {
  IsEmail,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsJWT,
} from 'class-validator';
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
export class VerifyOtpDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @IsString()
  @IsNotEmpty()
  otp: string;
}
export class ResetPasswordDto {
  @IsNotEmpty()
  @IsJWT()
  token: string;
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
