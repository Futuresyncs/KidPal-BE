import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SelectedCharacterService {
  private prisma = new PrismaClient();

  async createOrUpdateSelectedCharacter(
    userId: number,
    email: string,
    selectedCharacter: string,
  ) {
    return this.prisma.selectedCharacter.upsert({
      where: { email },
      create: {
        userId,
        email,
        selectedCharacter,
      },
      update: {
        selectedCharacter,
      },
    });
  }

  async getSelectedCharacter(email: string) {
    const character = await this.prisma.selectedCharacter.findUnique({
      where: { email },
      select: { selectedCharacter: true },
    });

    if (!character) {
      return `No selected character found for email: ${email}`;
    }

    return character;
  }

  async updateSelectedCharacter(email: string, selectedCharacter: string) {
    return this.prisma.selectedCharacter.update({
      where: { email },
      data: { selectedCharacter },
    });
  }
}
