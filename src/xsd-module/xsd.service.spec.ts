import { Test, TestingModule } from '@nestjs/testing';
import { XsdService } from './xsd.service';

describe('XsdService', () => {
  let service: XsdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XsdService],
    }).compile();

    service = module.get<XsdService>(XsdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
