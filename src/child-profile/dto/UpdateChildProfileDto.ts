import { PartialType } from '@nestjs/mapped-types';
import { CreateChildProfileDto } from './CreateChildProfileDto';

export class UpdateChildProfileDto extends PartialType(CreateChildProfileDto) {}
