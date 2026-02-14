import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Player } from './player/entities/player.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Player]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '/workspaces/fafsports/vlieservice-backend/vlieservice.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
