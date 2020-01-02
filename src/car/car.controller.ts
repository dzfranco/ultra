import { Controller, Get, UsePipes, Post, Body } from '@nestjs/common';
import { CarService } from './car.service';
import { CarInterface } from './interfaces/car.interface';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CreateCarDTO } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarService) {}

  @Get()
  public async findAll(): Promise<CarInterface[]> {
    const foundCars = await this.carService.findAll();
    return foundCars;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  public async createCar(@Body() createCarDTO: CreateCarDTO): Promise<any> {
    const createdCar = await this.carService.create(createCarDTO);
    return createdCar;
  }
}
