import { Test } from '@nestjs/testing';

import { CarsController } from './car.controller';
import { CarService } from './car.service';
import { ListCarDto } from './dto/list-car.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CarArrayFactoryMock } from './mock/car.controller.mock';

describe('CarsController', () => {
  let carController: CarsController;

  let carService = {
    findAll: () => Promise.resolve([]),
    create: carData => {
      return Promise.resolve({});
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [CarService],
    })
      .overrideProvider(getRepositoryToken(Car))
      .useValue({})
      .overrideProvider(CarService)
      .useValue(carService)
      .compile();

    carController = module.get<CarsController>(CarsController);
  });

  describe('findAll', () => {
    it('should return an array of cars', async () => {
      const result = [];
      jest
        .spyOn(carService, 'findAll')
        .mockImplementation(async () => CarArrayFactoryMock());
      const query = new ListCarDto();
      query.limit = 1;
      query.previousCursor = '';
      const cars = await carController.findAll(query);
      expect(cars).toEqual(CarArrayFactoryMock());
    });
  });
});
