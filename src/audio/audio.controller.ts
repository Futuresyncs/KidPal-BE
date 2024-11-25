import { Controller, Post, Body, Get, Delete, ParseIntPipe, Param } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post('generate')
  async generateAudio(@Body() body: { input: string; voice: string }) {
    const { input, voice } = body;
    return {
      url: await this.audioService.generateAudio(input, voice),
    };
  }

  @Get('history')
  async getAudioHistory() {
    return this.audioService.getAudioHistory();
  }

  @Delete(':id')
  async deleteAudio(@Param('id', ParseIntPipe) id: number) {
    return this.audioService.deleteAudio(id);
  }
}
