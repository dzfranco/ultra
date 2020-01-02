import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [CarModule, ManufacturerModule, OwnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
