import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProfile(@Req() req) {
    console.log(req)
    return {
      message: 'This is a protected route',
      user: req.user, // This is set by JwtStrategy's validate method
    };
  }
}
