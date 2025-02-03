import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {
  LogInUserDto,
  SignUpUserDto,
  ForgotPasswordDto,
  VerifyOtpDto,
  ResetPasswordDto,
} from './dto/auth-user-dto';
import { Response } from 'express';
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

  @Post('verifyOtp')
  async verifyOtp(@Body(ValidationPipe) body: VerifyOtpDto) {
    return this.authService.verifyOtp(body.userId, body.otp);
  }

  @Post('resetPassword')
  async resetPassword(@Body(ValidationPipe) body: ResetPasswordDto) {
    return this.authService.resetPassword(body.token, body.newPassword);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  // @UseGuards(AuthGuard('jwt'))
  async getUsers() {
    return this.authService.getUsers();
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google')) // Handle Google OAuth callback
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const response = await this.authService.googleLogin(req.user);

    // Construct the redirect URL with additional query parameters
    const redirectUrl = `mykidpal://auth?token=${response.token}&isOldUser=${response.isOldUser}&childId=${response.childId}&id=${response.id}&name=${encodeURIComponent(response.name)}&email=${encodeURIComponent(response.email)}`;

    // Redirect to the mobile app with the constructed URL
    res.redirect(redirectUrl);
  }

  // apple auth
  @Get('apple')
  @UseGuards(AuthGuard('apple'))
  async appleAuth(@Req() req) {}

  @Post('apple/callback')
  @UseGuards(AuthGuard('apple'))
  async appleAuthRedirect(@Req() req, @Res() res: Response) {
    // const response = await this.authService.appleLogin(req.user);
    console.log('Request received at /auth/apple/callback:', req.body);
  
    // const redirectUrl = `mykidpal://auth?token=${response.token}&isOldUser=${response.isOldUser}&childId=${response.childId}&id=${response.id}&name=${encodeURIComponent(response.name)}&email=${encodeURIComponent(response.email)}`;
  
    // res.redirect(redirectUrl);
  }
}
