import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChildProfileDto } from './dto/CreateChildProfileDto';
import { UpdateChildProfileDto } from './dto/UpdateChildProfileDto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ChildProfileService {
  private prisma = new PrismaClient();

  async create(createChildProfileDto: CreateChildProfileDto) {
    const { parent_id, nickName, age, character_id } = createChildProfileDto;
    try {
      return await this.prisma.child_Profile.create({
        data: {
          parent_id,
          nickName,
          age,
          character_id,
        },
      });
    } catch (error) {
      // Check for unique constraint violation
      if (error.code === 'P2002' && error.meta?.target?.includes('Child_Profile_parent_id_nickName_key')) {
        throw new HttpException(
          `Nickname "${nickName}" is already in use for this parent. Please choose a different nickname.`,
          HttpStatus.BAD_REQUEST,
        );
      }
  
      // Re-throw other errors
      throw error;
    }
  }

  async findAll() {
    return this.prisma.child_Profile.findMany({});
    // include: {
    //     user: true,
    //     report: true,
    //   }
  }

  async findOne(id: number) {
    const profile = await this.prisma.child_Profile.findUnique({
      where: { id },
    });
    if (!profile) {
      throw new NotFoundException(`Child Profile with ID ${id} not found`);
    }
    return profile;
  }

  async update(id: number, updateChildProfileDto: UpdateChildProfileDto) {
    const profile = await this.prisma.child_Profile.findUnique({
      where: { id },
    });
    if (!profile) {
      throw new NotFoundException(`Child Profile with ID ${id} not found`);
    }

    return this.prisma.child_Profile.update({
      where: { id },
      data: updateChildProfileDto,
    });
  }

  async remove(id: number) {
    const profile = await this.prisma.child_Profile.findUnique({
      where: { id },
    });
    if (!profile) {
      throw new NotFoundException(`Child Profile with ID ${id} not found`);
    }

    return this.prisma.child_Profile.delete({ where: { id } });
  }
}
