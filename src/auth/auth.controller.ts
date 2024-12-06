import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LogInUserDto,SignUpUserDto,ForgotPasswordDto } from './dto/auth-user-dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signup(@Body(ValidationPipe) body: SignUpUserDto) {
    return this.authService.signup(body.name, body.email, body.password);
  }

  @Post('logIn')
  async login(@Body(ValidationPipe) body: LogInUserDto) {
    return this.authService.login(body.email, body.password);
  }

  @Get('google')
  @UseGuards(AuthGuard('google')) // Trigger Google OAuth
  async googleAuth() {
    // This route initiates the Google OAuth process
  }
  @Post('forgotPassword')
  async forgotPassword(@Body(ValidationPipe) body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }
  @Get('users')
  // @UseGuards(AuthGuard('jwt')) // Trigger Google OAuth
  async getUsers() {
    return this.authService.getUsers();
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google')) // Handle Google OAuth callback
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req.user); // Process the user info
  }
}
