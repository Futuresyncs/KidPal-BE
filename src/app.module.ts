import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategyService } from './strategies/jwt-strategy.service';
import { ProfileController } from './profile/profile.controller';
import { AudioService } from './audio/audio.service';
import { AudioController } from './audio/audio.controller';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule],
  controllers: [AppController,ProfileController, AudioController],
  providers: [AppService, JwtStrategyService, AudioService],
})
export class AppModule {}
