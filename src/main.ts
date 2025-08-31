import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: errors => {
        const result = errors.map(error => ({
          field: error.property,
          message:
            error.constraints !== undefined
              ? error.constraints[Object.keys(error.constraints)[0]]
              : 'Unknown error',
        }));

        return new BadRequestException(result);
      },
    })
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
