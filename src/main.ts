import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Get PrismaService instance
  const prismaService = app.get(PrismaService);

  try {
    // Test the database connection
    await prismaService.$connect();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the application
  }
 // Serve static files from the public directory
 app.useStaticAssets(join(__dirname, '..', 'public'), {
  prefix: '/public/', // Ensure the public URL starts with `/public/`
});
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
