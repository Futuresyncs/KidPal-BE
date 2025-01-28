import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SelectedCharacterService } from './selected-character.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('selectedCharacter')
@UseGuards(AuthGuard('jwt')) // Ensure JWT is configured
export class SelectedCharacterController {
  constructor(
    private readonly selectedCharacterService: SelectedCharacterService,
  ) {}

  @Post()
  async createOrUpdateSelectedCharacter(@Req() req, @Body('selectedCharacter') selectedCharacter: string) {
    const userId = req.user.userId ; // Extract user ID from token
    const email = req.user.email; // Extract email from token
    return this.selectedCharacterService.createOrUpdateSelectedCharacter(
      userId,
      email,
      selectedCharacter,
    );
  }

  @Get()
  async getSelectedCharacter(@Req() req) {
    const email = req.user.email; // Extract eamil from token
    return this.selectedCharacterService.getSelectedCharacter(email);
  }

  @Put()
  async updateSelectedCharacter(
    @Req() req,
    @Body('selectedCharacter') selectedCharacter: string,
  ) {
    const email = req.user.email; // Extract eamil from token
    return this.selectedCharacterService.updateSelectedCharacter(
      email,
      selectedCharacter,
    );
  }
}
