import { Test, TestingModule } from '@nestjs/testing';
import { SelectedCharacterService } from './selected-character.service';

describe('SelectedCharacterService', () => {
  let service: SelectedCharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectedCharacterService],
    }).compile();

    service = module.get<SelectedCharacterService>(SelectedCharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
