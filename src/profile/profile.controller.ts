import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-strategy/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Req() req) {
    console.log(req)
    return {
      message: 'This is a protected route',
      user: req.user, // This is set by JwtStrategy's validate method
    };
  }
}
