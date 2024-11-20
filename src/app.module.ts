import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { ProfileController } from './profile/profile.controller';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule],
  controllers: [AppController,ProfileController],
  providers: [AppService, JwtStrategyService],
})
export class AppModule {}
