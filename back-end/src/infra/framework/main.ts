import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  const logger = new Logger();
  const port = process.env.PORT ?? 3333;

  await app.listen(port).then(() => {
    logger.log(`Listening on port ${port}`, 'Bootstrap');
  });
}
bootstrap();
