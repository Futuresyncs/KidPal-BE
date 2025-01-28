import { Test, TestingModule } from '@nestjs/testing';
import { SelectedCharacterController } from './selected-character.controller';

describe('SelectedCharacterController', () => {
  let controller: SelectedCharacterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectedCharacterController],
    }).compile();

    controller = module.get<SelectedCharacterController>(SelectedCharacterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
