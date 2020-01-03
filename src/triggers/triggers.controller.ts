import { Controller, Post } from '@nestjs/common';
import { CarService } from '../car/car.service';
import { OwnerService } from '../owner/owner.service';

@Controller('triggers')
export class TriggersController {
  constructor(
    private readonly carService: CarService,
    private readonly ownerService: OwnerService,
  ) {}

  @Post('discount')
  public async triggerDiscounts(): Promise<any> {
    await Promise.all([
      this.carService.discountCars(),
      this.ownerService.removeOldOwners(),
    ]);
    return;
  }
}
