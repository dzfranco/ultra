import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CarService } from '../car/car.service';
import { CarModule } from '../car/car.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from '../car/car.entity';

describe('CarsController', () => {
  let app: INestApplication;
  let carService = {
    findAll: () => [],
    create: carData => {},
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CarModule],
    })
      .overrideProvider(getRepositoryToken(Car))
      .useValue({})
      .overrideProvider(CarService)
      .useValue(carService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET cars`, () => {
    return request(app.getHttpServer())
      .get('/cars')
      .query({ limit: 1, previousCursor: '' })
      .expect(200)
      .expect(carService.findAll());
  });
});
