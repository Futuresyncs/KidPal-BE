import { Module } from '@nestjs/common';
import { SelectedCharacterService } from './selected-character.service';
import { SelectedCharacterController } from './selected-character.controller';

@Module({
  providers: [SelectedCharacterService],
  controllers: [SelectedCharacterController]
})
export class SelectedCharacterModule {}
