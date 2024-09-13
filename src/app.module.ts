import { Module } from '@nestjs/common';
import { XsdModule } from './xsd/xsd.module';

@Module({
  imports: [XsdModule],
})
export class AppModule {}
