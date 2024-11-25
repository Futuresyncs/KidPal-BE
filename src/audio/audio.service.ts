import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AudioService {
  private prisma = new PrismaClient();

  private readonly OPENAI_API_URL = process.env.OPENAI_API_URL;
  private readonly OPENAI_API_TOKEN = process.env.OPENAI_API_TOKEN;

  async generateAudio(input: string, voice: string): Promise<string> {
    try {
      const response = await axios.post(
        this.OPENAI_API_URL,
        { model: 'tts-1', input, voice },
        {
          headers: {
            Authorization: `Bearer ${this.OPENAI_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer', // Receive binary data
        },
      );

      // Ensure the directory exists
      const publicDir = path.join(__dirname, '..', '..', 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }

      // Save the audio file locally
      const fileName = `audio_${Date.now()}.mp3`;
      const filePath = path.join(publicDir, fileName);
      fs.writeFileSync(filePath, response.data);

      const audioUrl = `http://localhost:3000/public/${fileName}`;

      // Save the audio URL to the database
      await this.prisma.audio.create({
        data: {
          input,
          voice,
          url: audioUrl,
        },
      });

      return audioUrl;
    } catch (error) {
      console.error(
        'Error generating audio:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to generate audio');
    }
  }

  // Delete an audio record
  async deleteAudio(id: number): Promise<{ message: string }> {
    // Find the audio record in the database
    const audioRecord = await this.prisma.audio.findUnique({
      where: { id },
    });

    if (!audioRecord) {
      throw new NotFoundException(`Audio record with ID ${id} not found`);
    }

    // Delete the file from the public folder
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'public',
      path.basename(audioRecord.url),
    );
    console.log('path:' + ' ' + filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete the record from the database
    await this.prisma.audio.delete({
      where: { id },
    });

    return { message: `Audio record with ID ${id} deleted successfully` };
  }

  async getAudioHistory() {
    return this.prisma.audio.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
