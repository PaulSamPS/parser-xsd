import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { XsdModule } from './xsd/xsd.module';
import { XMLMiddleware } from './middleware/xmlBodyParserMiddleware';

@Module({
  imports: [XsdModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XMLMiddleware).forRoutes({
      path: '/*',
      method: RequestMethod.ALL,
    });
  }
}
