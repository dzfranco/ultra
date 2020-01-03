import ObjectId from 'bson-objectid';
import { Injectable, Inject } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { subMonths } from 'date-fns';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CarInterface } from './interfaces/car.interface';
import { CreateCarDTO } from './dto/create-car.dto';
import { ListCarDto } from './dto/list-car.dto';
import { ManufacturerInterface } from '../manufacturer/interfaces/manufacturer.interface';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { UpdateCarDTO } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(
    private readonly manufacturerService: ManufacturerService,
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
    const cars = await pipeline.getMany();
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
   * @description Updates a Car
   * @param  {UpdateCarDTO} carData
   * @return Promise<CarInterface>
   * @memberof CarService
   */
  public async update(carData: UpdateCarDTO): Promise<CarInterface> {
    const foundCar = await this.carRepository.findOne(carData.id);
    if (!foundCar) {
      throw new HttpException('Car Not Found', 404);
    }
    foundCar.$id = carData.id;
    foundCar.$firstRegistrationDate = new Date(carData.firstRegistrationDate);
    foundCar.$manufacturerId = carData.manufacturerId;
    foundCar.$price = carData.price;
    const savedCar = await this.carRepository.save(foundCar);
    return savedCar;
  }

  /**
   * @description Removes a car
   * @param  {string} carId
   * @return Promise<CarInterface>
   * @memberof CarService
   */
  public async remove(carId: string): Promise<CarInterface> {
    const foundCar = await this.carRepository.findOne(carId);
    if (!foundCar) {
      throw new HttpException('Car Not Found', 404);
    }
    const removedCar = await this.carRepository.remove(foundCar);
    return removedCar;
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
    const manufacturer = await this.manufacturerService.getManufacturerById(
      foundCar.$manufacturerId,
    );
    if (!manufacturer) {
      throw new HttpException('Manufacturer not found', 404);
    }
    return manufacturer;
  }

  /**
   * @description Discounts all cars between 12 and 18 months
   * @return Promise<any>
   * @memberof CarService
   */
  public async discountCars(): Promise<any> {
    const maxPercentage = 100;
    const discountPercentage = 20;
    const multiplicationFactor =
      (maxPercentage - discountPercentage) / maxPercentage;
    const now = new Date();
    const lowerBound = subMonths(now, 18);
    const upperBound = subMonths(now, 12);
    const results = await this.carRepository
      .createQueryBuilder()
      .update(Car)
      .set({ price: () => `price * ${multiplicationFactor}` } as any)
      .where(
        `firstRegistrationDate < :upperBound AND firstRegistrationDate > :lowerBound`,
        {
          upperBound,
          lowerBound,
        },
      )
      .execute();
    return results;
  }
}
