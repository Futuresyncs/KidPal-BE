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
  } from '@nestjs/common';
  import { ChildProfileService } from './child-profile.service';
  import { CreateChildProfileDto } from './dto/CreateChildProfileDto';
  import { UpdateChildProfileDto } from './dto/UpdateChildProfileDto';
  
  @Controller('child-profile')
  export class ChildProfileController {
    constructor(private readonly childProfileService: ChildProfileService) {}
  
    @Post()
    async create(
      @Body(new ValidationPipe({ whitelist: true }))
      createChildProfileDto: CreateChildProfileDto,
    ) {
      return this.childProfileService.create(createChildProfileDto);
    }
  
    @Get()
    async findAll() {
      return this.childProfileService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.childProfileService.findOne(id);
    }
  
    @Patch(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body(new ValidationPipe({ whitelist: true }))
      updateChildProfileDto: UpdateChildProfileDto,
    ) {
      return this.childProfileService.update(id, updateChildProfileDto);
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
      return this.childProfileService.remove(id);
    }
  }
  