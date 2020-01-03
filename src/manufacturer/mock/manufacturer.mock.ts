import { Manufacturer } from '../manufacturer.entity';

export const ManufacturerMock = () => {
  const manufacturer = new Manufacturer();
  manufacturer.$id = 'abc';
  manufacturer.$name = 'test';
  manufacturer.$phone = '484848';
  manufacturer.$siret = 478489498;
  return manufacturer;
};
