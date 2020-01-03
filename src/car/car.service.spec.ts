import { Test } from '@nestjs/testing';

import { CarService } from './car.service';
import { ListCarDto } from './dto/list-car.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from './car.entity';
import {
  CreateCarDTOFactoryMock,
  CarFactoryMock,
  ManufacturerMock,
} from './mock/car.controller.mock';
import { async } from 'rxjs/internal/scheduler/async';
import { Manufacturer } from '../manufacturer/manufacturer.entity';

describe('CarsController', () => {
  const findOne = jest.fn().mockReturnValue({});
  const update = jest.fn().mockReturnValue({});
  const insert = jest.fn().mockReturnValue({});
  const remove = jest.fn().mockReturnValue({});
  const updateSpy = jest.fn().mockReturnThis();
  const setSpy = jest.fn().mockReturnThis();
  const whereSpy = jest.fn().mockReturnThis();
  const orderBySpy = jest.fn().mockReturnThis();
  const limitSpy = jest.fn().mockReturnThis();
  const executeSpy = jest.fn().mockReturnThis();

  let carsRepo;
  let carService: CarService;

  beforeEach(async () => {
    carsRepo = {
      findOne,
      update,
      insert,
      remove,
      createQueryBuilder: jest.fn().mockReturnValue({
        update: updateSpy,
        set: setSpy,
        where: whereSpy,
        orderBy: orderBySpy,
        limit: limitSpy,
        execute: executeSpy,
      }),
    };
    const module = await Test.createTestingModule({
      providers: [
        CarService,
        { provide: getRepositoryToken(Car), useValue: carsRepo },
      ],
    }).compile();

    carService = module.get<CarService>(CarService);
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('findAll', () => {
    it('should use the right query when there is no previous cursor', async () => {
      const query = new ListCarDto();
      query.limit = 1;
      query.previousCursor = '';
      await carService.findAll(query);
      expect(carsRepo.createQueryBuilder).toBeCalledTimes(1);
      expect(orderBySpy).toBeCalledWith('createdAt', 'DESC');
      expect(limitSpy).toBeCalledWith(query.limit);
    });

    it('should use the right query when there is a previous cursor', async () => {
      const query = new ListCarDto();
      query.limit = 1;
      query.previousCursor = 'abc123';
      await carService.findAll(query);
      expect(carsRepo.createQueryBuilder).toBeCalledTimes(1);
      expect(whereSpy).toHaveBeenNthCalledWith(1, 'id < :id', {
        id: query.previousCursor,
      });
      expect(orderBySpy).toBeCalledWith('createdAt', 'DESC');
      expect(limitSpy).toBeCalledWith(query.limit);
    });
  });

  describe('create', () => {
    it('should create the right object', async () => {
      const carDto = CreateCarDTOFactoryMock();
      await carService.create(carDto);
      expect(carsRepo.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          firstRegistrationDate: carDto.firstRegistrationDate,
          manufacturerId: carDto.manufacturerId,
          price: carDto.price,
        }),
      );
    });
  });

  describe('getCarManufacturer', () => {
    it('should find a car', async () => {
      const carMock = CarFactoryMock();
      const manufacturer = ManufacturerMock();
      const carSpy = jest
        .spyOn(carMock, '$manufacturer', 'get')
        .mockReturnValue(Promise.resolve(manufacturer));
      const spy = jest.spyOn(carsRepo, 'findOne').mockImplementation(() => {
        return Promise.resolve(carMock);
      });
      const foundManufacturer = await carService.getCarManufacturer('1');
      expect(spy).toHaveBeenCalled();
      expect(carSpy).toHaveBeenCalled();
      expect(foundManufacturer).toEqual(manufacturer);
    });

    it('should throw an error when no car is found', async () => {
      const spy = jest.spyOn(carsRepo, 'findOne').mockImplementation(() => {
        return Promise.resolve(undefined);
      });
      await expect(carService.getCarManufacturer('')).rejects.toMatchObject({
        message: 'Car Not Found',
        status: 404,
      });
    });
  });
});
