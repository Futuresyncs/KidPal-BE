import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '../strategies/google.strategy';
import { AppleAuthStrategy } from '../strategies/apple.strategy';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use a secure secret key for production
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService,GoogleStrategy,AppleAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
