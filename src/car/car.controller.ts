import {
  Controller,
  Get,
  UsePipes,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CarInterface } from './interfaces/car.interface';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CreateCarDTO } from './dto/create-car.dto';
import { ListCarDto } from './dto/list-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';
import { ValidateObjectIdPipe } from '../shared/pipes/validate-objectId.pipe';

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarService) {}
  @UsePipes(new ValidationPipe())
  @Get()
  public async findAll(@Query() query: ListCarDto): Promise<CarInterface[]> {
    const foundCars = await this.carService.findAll(query);
    return foundCars;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  public async createCar(
    @Body() createCarDTO: CreateCarDTO,
  ): Promise<CarInterface> {
    const createdCar = await this.carService.create(createCarDTO);
    return createdCar;
  }

  @Get(':id/manufacturer')
  public async getManufacturer(
    @Param('id', new ValidateObjectIdPipe()) id: string,
  ): Promise<any> {
    const manufacturer = await this.carService.getCarManufacturer(id);
    return manufacturer;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  public async update(
    @Param('id', new ValidateObjectIdPipe()) id: string,
    @Body() updateCarDTO: UpdateCarDTO,
  ): Promise<any> {
    updateCarDTO.id = id;
    const updatedCar = await this.carService.update(updateCarDTO);
    return updatedCar;
  }

  @Delete('/:id')
  public async remove(
    @Param('id', new ValidateObjectIdPipe()) id: string,
  ): Promise<any> {
    const removedCar = await this.carService.remove(id);
    return removedCar;
  }
}
