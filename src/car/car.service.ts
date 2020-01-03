import ObjectId from 'bson-objectid';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CarInterface } from './interfaces/car.interface';
import { CreateCarDTO } from './dto/create-car.dto';
import { ListCarDto } from './dto/list-car.dto';
import { ManufacturerInterface } from '../manufacturer/interfaces/manufacturer.interface';

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
      car.$manufacturerId = carData.manufacturerId;
      car.$firstRegistrationDate = new Date(carData.firstRegistrationDate);
      await this.carRepository.insert(car);
      return car;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Gets the manufacturer of a car
   * @param  {string} carId
   * @return Promise<CarInterface>
   * @memberof CarService
   */
  public async getCarManufacturer(
    carId: string,
  ): Promise<ManufacturerInterface> {
    const foundCar = await this.carRepository.findOne(carId);
    if (!foundCar) {
      throw new HttpException('Car Not Found', 404);
    }
    const manufacturer = await foundCar.$manufacturer;
    return manufacturer;
  }
}
