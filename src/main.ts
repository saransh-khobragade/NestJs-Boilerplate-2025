import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());
  
  // Global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  await app.listen(8080);

  console.log(`✅ Application is running on: http://localhost:8080`);
}

bootstrap();
