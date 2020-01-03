import { Car } from '../car.entity';
import { CreateCarDTO } from '../dto/create-car.dto';
import { UpdateCarDTO } from '../dto/update-car.dto';

export const CarArrayFactoryMock = () => {
  const car1 = new Car();
  car1.$id = '5e0e6f82d627c600c5c71c5';
  car1.$createdAt = new Date('2020-01-03T00:07:24.861Z');
  car1.$updatedAt = new Date('2020-01-03T00:07:24.861Z');
  car1.$manufacturerId = 'abc';
  car1.$price = 29.99;
  return [car1];
};

export const CreateCarDTOFactoryMock = () => {
  const carDto = new CreateCarDTO();
  carDto.firstRegistrationDate = new Date('2020-01-03T00:07:24.861Z');
  carDto.manufacturerId = 'abc';
  carDto.price = 29.99;
  return carDto;
};

export const UpdateCarDTOFactoryMock = () => {
  const carDto = new UpdateCarDTO();
  carDto.id = '5e0e6f82d627c600c5c71c5';
  carDto.firstRegistrationDate = new Date('2020-01-03T00:07:24.861Z');
  carDto.manufacturerId = 'abc';
  carDto.price = 29.99;
  return carDto;
};

export const CarFactoryMock = () => {
  const car1 = new Car();
  car1.$id = 'abc123';
  car1.$createdAt = new Date('2020-01-03T00:07:24.861Z');
  car1.$updatedAt = new Date('2020-01-03T00:07:24.861Z');
  car1.$manufacturerId = 'abc';
  car1.$price = 29.99;
  return car1;
};
