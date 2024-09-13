import { Controller } from '@nestjs/common';
import { XsdService } from './xsd.service';

@Controller('xsd')
export class XsdController {
  constructor(private readonly xsdService: XsdService) {}
}
