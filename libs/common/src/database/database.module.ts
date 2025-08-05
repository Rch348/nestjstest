import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

@Module({
  // .forRootAsync() : pour injecter des modules de façon asynchrone et y avoir accès (ex: config service).
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      // Crée les options du module.
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
