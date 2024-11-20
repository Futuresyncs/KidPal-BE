import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
