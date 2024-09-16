import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { XsdService } from './xsd.service';
import { Response } from 'express';

export enum Queries {
  DocApplication = 'DocApplication',
  DocNotificationAboutBuilding = 'DocNotificationAboutBuilding',
}

@Controller('xsd')
export class XsdController {
  constructor(private readonly xsdService: XsdService) {}

  @Get('generate')
  async getXsd(@Res() res: Response, @Query('name') query: Queries) {
    if (!query) {
      throw new HttpException('Укажите query - ?name=', HttpStatus.BAD_REQUEST);
    }
    return this.xsdService.getCombinedXsd(res, query);
  }
}
