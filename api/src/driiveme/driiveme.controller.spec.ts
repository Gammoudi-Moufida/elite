import { Test, TestingModule } from '@nestjs/testing';
import { DriivemeController } from './controllers/driiveme.controller';

describe('DriivemeController', () => {
  let controller: DriivemeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriivemeController],
    }).compile();

    controller = module.get<DriivemeController>(DriivemeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
