import { Module } from '@nestjs/common';
import { CarsController } from './car.controller';
import { CarService } from './car.service';

@Module({
  controllers: [CarsController],
  providers: [CarService],
})
export class CarModule {}
