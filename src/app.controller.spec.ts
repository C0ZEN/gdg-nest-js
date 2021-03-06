import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('Users Controller', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return hello world', () => {
    expect(controller.root()).toEqual({ message: 'Hello world ! 🦄' });
  });
});
