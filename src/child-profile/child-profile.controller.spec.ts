import { Test, TestingModule } from '@nestjs/testing';
import { ChildProfileController } from './child-profile.controller';

describe('ChildProfileController', () => {
  let controller: ChildProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChildProfileController],
    }).compile();

    controller = module.get<ChildProfileController>(ChildProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
