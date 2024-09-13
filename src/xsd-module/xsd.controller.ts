import { Controller, Get, Res } from '@nestjs/common';
import { XsdService } from './xsd.service';
import { Response } from 'express';

@Controller('xsd')
export class XsdController {
  constructor(private readonly xsdService: XsdService) {}

  @Get('docApplication')
  async getCombinedXsd(@Res() res: Response) {
    return this.xsdService.getCombinedXsd(res);
  }
}
