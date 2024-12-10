import { Controller,  Get,  } from '@nestjs/common';
import { AvatarService } from './avatar.service';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}



  @Get('list')
  async getAvatarList() {
    return this.avatarService.getAvatarList();
  }

}
