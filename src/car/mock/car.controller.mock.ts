import { Car } from '../car.entity';

export const CarArrayFactoryMock = () => {
  const car1 = new Car();
  car1.$id = 'abc123';
  car1.$createdAt = new Date('2020-01-03T00:07:24.861Z');
  car1.$updatedAt = new Date('2020-01-03T00:07:24.861Z');
  car1.$manufacturerId = 'abc';
  car1.$price = 29.99;
  return [car1];
};
