import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '../strategies/google.strategy';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use a secure secret key for production
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService,GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
