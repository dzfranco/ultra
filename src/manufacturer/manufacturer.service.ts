import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Repository } from 'typeorm';
import { ManufacturerInterface } from '../../dist/manufacturer/interfaces/manufacturer.interface';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
  ) {}

  /**
   * @description Gets a manufacturer given its id
   * @param  {string} manufacturerId
   * @return Promise<ManufacturerInterface>
   * @memberof ManufacturerService
   */
  public async getManufacturerById(
    manufacturerId: string,
  ): Promise<ManufacturerInterface> {
    const foundManufacturer = await this.manufacturerRepository.findOne(
      manufacturerId,
    );
    return foundManufacturer;
  }
}
