import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

    const origin = req.headers.origin;

    if (!origin || !allowedOrigins.includes(origin)) {
      return res.status(403).send('Forbidden: Origin not allowed');
    }
    next();
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
