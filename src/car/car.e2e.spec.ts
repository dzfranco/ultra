import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarService } from './car.service';
import { CarModule } from './car.module';
import { Car } from './car.entity';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { CarFactoryMock } from './mock/car.controller.mock';

describe('CarsController', () => {
  let app: INestApplication;
  const manufacturerService = {
    getManufacturerById: () => ({}),
  };
  const carService = {
    findAll: () => [],
    create: carData => {
      return {};
    },
    update: () => ({}),
    remove: () => CarFactoryMock(),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CarModule],
    })
      .overrideProvider(getRepositoryToken(Manufacturer))
      .useValue({})
      .overrideProvider(ManufacturerService)
      .useValue(manufacturerService)
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
  it(`/GET cars validates params`, () => {
    return request(app.getHttpServer())
      .get('/cars')
      .expect(400);
  });

  it(`/POST cars`, async () => {
    const response = await request(app.getHttpServer())
      .post('/cars')
      .send({
        manufacturerId: 'abc123',
        price: 59,
        firstRegistrationDate: '2012-03-29T10:05:45-06:00',
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual(carService.create({}));
  });

  it(`/POST cars validates format`, async () => {
    const response = await request(app.getHttpServer())
      .post('/cars')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      errors: {
        firstRegistrationDateisDate:
          'firstRegistrationDate must be a Date instance',
        manufacturerIdisNotEmpty: 'manufacturerId should not be empty',
        manufacturerIdisString: 'manufacturerId must be a string',
        priceisNumber:
          'price must be a number conforming to the specified constraints',
        priceisPositive: 'price must be a positive number',
      },
      message: 'Input data validation failed',
    });
  });

  it(`/PUT cars should validate ID`, async () => {
    const response = await request(app.getHttpServer())
      .put('/cars/abc123')
      .send({
        manufacturerId: 'abc123',
        price: 59,
        firstRegistrationDate: '2012-03-29T10:05:45-06:00',
      });
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Id Validation Failed',
      statusCode: 400,
    });
  });

  it(`/PUT cars should respond`, async () => {
    const response = await request(app.getHttpServer())
      .put('/cars/5e0e6ced773aa10037912792')
      .send({
        manufacturerId: 'abc123',
        price: 59,
        firstRegistrationDate: '2012-03-29T10:05:45-06:00',
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(carService.create({}));
  });

  it(`/PUT cars validates format`, async () => {
    const response = await request(app.getHttpServer())
      .put('/cars/1')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      errors: {
        firstRegistrationDateisDate:
          'firstRegistrationDate must be a Date instance',
        manufacturerIdisNotEmpty: 'manufacturerId should not be empty',
        manufacturerIdisString: 'manufacturerId must be a string',
        priceisNumber:
          'price must be a number conforming to the specified constraints',
        priceisPositive: 'price must be a positive number',
      },
      message: 'Input data validation failed',
    });
  });

  it(`/DELETE should respond`, async () => {
    const response = await request(app.getHttpServer()).delete(
      '/cars/5e0e6ced773aa10037912792',
    );
    expect(response.status).toBe(200);
  });
});
