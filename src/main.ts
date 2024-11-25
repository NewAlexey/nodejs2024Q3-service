import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs';
import { stringify } from 'json-to-pretty-yaml';

import { AppModule } from 'src/app.module';
import { CatchEverythingFilter } from 'src/filters/exception.filter';
import { LoggerService } from 'src/modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new CatchEverythingFilter(httpAdapter, new LoggerService()),
  );

  const config = new DocumentBuilder()
    .setTitle('Home Library')
    .setDescription('The Home Library API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  if (process.env.GENERATE_YAML) {
    const data = stringify(document);

    writeFile('doc/api.yaml', data, (err) => {
      if (err) console.log(err);
    });
  }

  await app.listen(process.env.PORT);
}
bootstrap();
