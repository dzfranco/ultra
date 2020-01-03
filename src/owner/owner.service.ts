import { Owner } from './owner.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ObjectId from 'bson-objectid';
import { subMonths } from 'date-fns';
import { CreateOwnerDTO } from './dto/create-owner.dto';
import { OwnerInterface } from './interfaces/owner.interface';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  /**
   * @description Creates an owner
   * @param  {CreateOwnerDTO} ownerData
   * @return Promise<OwnerInterface>
   * @memberof OwnerService
   */
  public async createOwner(ownerData: CreateOwnerDTO): Promise<OwnerInterface> {
    const owner = new Owner();
    owner.$id = new ObjectId().toHexString();
    owner.$name = ownerData.$name;
    owner.$carId = ownerData.$carId;
    owner.$purchaseDate = ownerData.$purchaseDate;
    await this.ownerRepository.insert(owner);
    return owner;
  }

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
