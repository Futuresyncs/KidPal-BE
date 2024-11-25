import { Controller, Post, Body, Get, Req, UseGuards,ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserDto } from './dto/auth-user-dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) body: AuthUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('login')
  async login(@Body(ValidationPipe) body: AuthUserDto) {
    return this.authService.login(body.email, body.password);
  }

  @Get('google')
  @UseGuards(AuthGuard('google')) // Trigger Google OAuth
  async googleAuth() {
    // This route initiates the Google OAuth process
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google')) // Handle Google OAuth callback
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req.user); // Process the user info
  }
}
