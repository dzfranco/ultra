import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { Repository } from 'typeorm';
import { CarInterface } from './interfaces/car.interface';
import { CreateCarDTO } from './dto/create-car.dto';
import ObjectId from 'bson-objectid';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
  ) {}

  public findAll(): Promise<CarInterface[]> {
    return this.carRepository.find();
  }

  /**
   * @description Creates a new Car
   * @param  {CreateCarDTO} carData
   * @return Promise<CarInterface>
   * @memberof CarService
   */
  public async create(carData: CreateCarDTO): Promise<CarInterface> {
    try {
      const car = new Car();
      car.$id = new ObjectId().toHexString();
      car.$price = carData.price;
      car.$manufacturerId = carData.manufacturerId.toString();
      car.$firstRegistrationDate = new Date(carData.firstRegistrationDate);
      await this.carRepository.insert(car);
      return car;
    } catch (error) {
      throw error;
    }
  }
}
