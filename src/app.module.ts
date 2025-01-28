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
import { AvatarController } from './avatar/avatar.controller';
import { AvatarService } from './avatar/avatar.service';
import { ReportModule } from './report/report.module';
import { ChildProfileModule } from './child-profile/child-profile.module';
import { SelectedCharacterModule } from './selected-character/selected-character.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, ReportModule, ChildProfileModule, SelectedCharacterModule],
  controllers: [AppController,ProfileController, AudioController,AvatarController],
  providers: [AppService, JwtStrategyService, AudioService,AvatarService],
})
export class AppModule {}
