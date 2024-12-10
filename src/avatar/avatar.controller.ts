import { Controller, Get, UseGuards } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  async getAvatarList() {
    return this.avatarService.getAvatarList();
  }
}
