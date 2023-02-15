import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HealthModule } from './health/health.module';

async function bootstrap() {
  const app = await NestFactory.create(HealthModule);

  const config = new DocumentBuilder()
      .setTitle('Chat API')
      .setDescription('API for company\'s chat')
      .setVersion('1.0')
      .addTag('chat')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
