import { Test } from '@nestjs/testing';

import { CarService } from './car.service';
import { ListCarDto } from './dto/list-car.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { ManufacturerMock } from '../manufacturer/mock/manufacturer.mock';
import { GenericRepo } from '../shared/mocks/repo.mock';
import {
  CreateCarDTOFactoryMock,
  CarFactoryMock,
} from './mock/car.controller.mock';

describe('CarsController', () => {
  let carsRepo: GenericRepo;
  let orderBySpy;
  let whereSpy;
  let limitSpy;
  const manufacturerService: Partial<ManufacturerService> = {
    getManufacturerById: jest.fn().mockReturnValue({}),
  };
  let carService: CarService;
  beforeEach(async () => {
    carsRepo = new GenericRepo();
    orderBySpy = jest
      .spyOn(carsRepo.createQueryBuilder(), 'orderBy')
      .mockReturnThis();
    whereSpy = jest
      .spyOn(carsRepo.createQueryBuilder(), 'where')
      .mockReturnThis();
    limitSpy = jest
      .spyOn(carsRepo.createQueryBuilder(), 'limit')
      .mockReturnThis();
    jest.restoreAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        CarService,
        { provide: getRepositoryToken(Car), useValue: carsRepo },
        { provide: ManufacturerService, useValue: manufacturerService },
      ],
    }).compile();

    carService = module.get<CarService>(CarService);
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
      expect(orderBySpy).toBeCalledWith('createdAt', 'DESC');
      expect(limitSpy).toBeCalledWith(query.limit);
    });

    it('should use the right query when there is a previous cursor', async () => {
      const query = new ListCarDto();

      query.limit = 1;
      query.previousCursor = 'abc123';
      await carService.findAll(query);

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
      const manufacturerServiceSpy = jest
        .spyOn(manufacturerService, 'getManufacturerById')
        .mockReturnValue(Promise.resolve(manufacturer));
      const spy = jest.spyOn(carsRepo, 'findOne').mockImplementation(() => {
        return Promise.resolve(carMock);
      });
      const foundManufacturer = await carService.getCarManufacturer('1');
      expect(spy).toHaveBeenCalled();
      expect(manufacturerServiceSpy).toHaveBeenCalled();
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
