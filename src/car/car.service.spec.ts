import { Test } from '@nestjs/testing';

import { CarsController } from './car.controller';
import { CarService } from './car.service';
import { ListCarDto } from './dto/list-car.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CarArrayFactoryMock } from './mock/car.controller.mock';
import { CarModule } from './car.module';

describe('CarsController', () => {
  const findOne = jest.fn().mockReturnValue({});
  const update = jest.fn().mockReturnValue({});
  const save = jest.fn().mockReturnValue({});
  const remove = jest.fn().mockReturnValue({});
  const updateSpy = jest.fn().mockReturnThis();
  const setSpy = jest.fn().mockReturnThis();
  const whereSpy = jest.fn().mockReturnThis();
  const orderBySpy = jest.fn().mockReturnThis();
  const limitSpy = jest.fn().mockReturnThis();
  const executeSpy = jest.fn().mockReturnThis();

  let carsRepo = {
    findOne,
    update,
    save,
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
  let carService: CarService;

  beforeEach(async () => {
    carsRepo = {
      findOne,
      update,
      save,
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
      expect(whereSpy).toBeCalledWith('id < :id', { id: query.previousCursor });
      expect(orderBySpy).toBeCalledWith('createdAt', 'DESC');
      expect(limitSpy).toBeCalledWith(query.limit);
    });
  });
});
