import { Owner } from '../../owner/interfaces/owner.interface';
import { Manufacturer } from '../../manufacturer/interfaces/manufacturer.interface';

export interface Car {
  id: string;
  manufacturer: Manufacturer;
  price: number;
  firstRegistrationDate: Date;
  owner: Owner;
}
