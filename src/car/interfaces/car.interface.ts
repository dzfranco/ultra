import { OwnerInterface } from '../../owner/interfaces/owner.interface';
import { ManufacturerInterface } from '../../manufacturer/interfaces/manufacturer.interface';

export interface CarInterface {
  $id: string;
  $manufacturer: Promise<ManufacturerInterface>;
  $manufacturerId: string;
  $price: number;
  $firstRegistrationDate: Date;
  $owner: OwnerInterface[];
}
