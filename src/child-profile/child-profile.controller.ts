import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ChildProfileService } from './child-profile.service';
import { CreateChildProfileDto } from './dto/CreateChildProfileDto';
import { UpdateChildProfileDto } from './dto/UpdateChildProfileDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('child-profile')
export class ChildProfileController {
  constructor(private readonly childProfileService: ChildProfileService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body(new ValidationPipe({ whitelist: true }))
    createChildProfileDto: CreateChildProfileDto,
  ) {
    return this.childProfileService.create(createChildProfileDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return this.childProfileService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.childProfileService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true }))
    updateChildProfileDto: UpdateChildProfileDto,
  ) {
    return this.childProfileService.update(id, updateChildProfileDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.childProfileService.remove(id);
  }
}
