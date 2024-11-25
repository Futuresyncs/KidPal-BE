import { IsEmail , IsString, IsNotEmpty } from 'class-validator';
export class AuthUserDto {

  @IsString()  
  @IsNotEmpty()  
  password: string;
  @IsEmail()
  email: string;

 
}
