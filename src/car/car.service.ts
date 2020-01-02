import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { Repository } from 'typeorm';
import { CarInterface } from './interfaces/car.interface';
import { CreateCarDTO } from './dto/create-car.dto';
import ObjectId from 'bson-objectid';
import { ListCarDto } from './dto/list-car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
  ) {}

  /**
   * @description Finds all of the cars given a selected cursor and limit
   * @param  {ListCarDto} query
   * @return Promise<CarInterface[]>
   * @memberof CarService
   */
  public async findAll(query: ListCarDto): Promise<CarInterface[]> {
    let pipeline = this.carRepository.createQueryBuilder();
    if (query.previousCursor.length !== 0) {
      pipeline = pipeline.where('id < :id', { id: query.previousCursor });
    }
    pipeline = pipeline.orderBy('createdAt', 'DESC').limit(query.limit);
    const cars = (await pipeline.execute()) as Car[];
    return cars;
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
