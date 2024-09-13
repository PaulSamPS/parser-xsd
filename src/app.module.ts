import { Module } from '@nestjs/common';
import { XsdModule } from './xsd-module/xsd.module';

@Module({
  imports: [XsdModule],
})
export class AppModule {}
