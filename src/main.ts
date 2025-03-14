import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Agendai API')
    .setDescription('The Agendai API description')
    .setVersion('1.0')
    .addTag('agendai')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
