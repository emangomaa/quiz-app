import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix 
app.setGlobalPrefix('api/v1');
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe(
    {transform:true,
      whitelist:true,
      forbidNonWhitelisted:true,
      
    }
  ));
  // Swagger configuration
   const config = new DocumentBuilder()
    .setTitle('API Title')
    .setDescription('API Description')
    .setVersion('1.0')
    .build();
  
  // Create document and setup Swagger UI at /api
  const document = SwaggerModule.createDocument(app, config);
  // Serve Swagger UI at /api
  SwaggerModule.setup('api', app, document); 

  // Start the server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
