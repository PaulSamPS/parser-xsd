import { Test, TestingModule } from '@nestjs/testing';
import { XsdController } from './xsd.controller';
import { XsdService } from './xsd.service';

describe('XsdController', () => {
  let controller: XsdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XsdController],
      providers: [XsdService],
    }).compile();

    controller = module.get<XsdController>(XsdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
