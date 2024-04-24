import 'moment-timezone'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as moment from 'moment';

moment.tz.setDefault('Asia/Ho_Chi_Minh')
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: ["http://localhost:5173", "http://localhost:8000"] });

  await app.listen(3000);
  app.use(cookieParser());
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();