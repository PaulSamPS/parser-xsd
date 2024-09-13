import { Module } from '@nestjs/common';
import { XsdService } from './xsd.service';
import { XsdController } from './xsd.controller';

@Module({
  controllers: [XsdController],
  providers: [XsdService],
})
export class XsdModule {}
