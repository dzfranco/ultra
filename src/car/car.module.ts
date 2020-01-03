import { Module } from '@nestjs/common';
import { CarsController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { ManufacturerModule } from '../manufacturer/manufacturer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), ManufacturerModule],
  controllers: [CarsController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
