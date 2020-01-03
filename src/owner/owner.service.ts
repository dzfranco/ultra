import { Owner } from './owner.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { subMonths } from 'date-fns';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  /**
   * @description Removes the old owners
   * @return
   * @memberof OwnerService
   */
  public async removeOldOwners() {
    const now = new Date();
    const lowerBound = subMonths(now, 18);
    const results = await this.ownerRepository
      .createQueryBuilder()
      .delete()
      .where(`purchaseDate < :purchaseDate`, { purchaseDate: lowerBound })
      .execute();
    return results;
  }
}
