import { Controller, Post, Body, Get, Delete, ParseIntPipe, Param } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post('generate')
  async generateAudio(@Body() body: { input: string; voice: string,isSample?:boolean }) {
    const { input, voice,isSample } = body;
    return {
      url: await this.audioService.generateAudio(input, voice,isSample),
    };
  }

  @Get('history')
  async getAudioHistory() {
    return this.audioService.getAudioHistory();
  }
  @Get('samples')
  async getAudioSample() {
    return this.audioService.getAudioSample();
  }

  @Delete(':id')
  async deleteAudio(@Param('id', ParseIntPipe) id: number) {
    return this.audioService.deleteAudio(id);
  }
}
