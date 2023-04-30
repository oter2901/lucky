import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import AppModule from './modules/app/app.module';
import UnauthorizedExceptionFilter from './filters/unauthorized-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(
    new UnauthorizedExceptionFilter(),
  );

  const port = configService.get<number>('SERVER_PORT') || 3000;

  const options = new DocumentBuilder()
    .setTitle('Api v1')
    .setDescription('Lucky App code challenge documentation')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, async () => {
    console.log(`The server is running on ${port} port: http://localhost:${port}/api`);
  });
}
bootstrap();
