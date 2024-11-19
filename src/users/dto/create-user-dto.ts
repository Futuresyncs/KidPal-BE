import { IsEmail, IsEnum , IsString, IsNotEmpty } from 'class-validator';
export class CreateUserDto {

  @IsString()  
  @IsNotEmpty()  
  name: string;
  @IsEmail()
  email: string;

  @IsEnum(['Viewer', 'Admin', 'Editor'], {
    message: 'Valid role required',
  })
  role: 'Viewer' | 'Admin' | 'Editor';
}
