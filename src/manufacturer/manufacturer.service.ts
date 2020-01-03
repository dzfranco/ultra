import ObjectId from 'bson-objectid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Repository } from 'typeorm';
import { ManufacturerInterface } from './interfaces/manufacturer.interface';
import { CreateManufacturerDTO } from './dto/create-manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
  ) {}

  /**
   * @description Creates a manufacturer
   * @param  {CreateManufacturerDTO} manufacturerData
   * @return Promise<ManufacturerInterface>
   * @memberof ManufacturerService
   */
  public async createManufacturer(
    manufacturerData: CreateManufacturerDTO,
  ): Promise<ManufacturerInterface> {
    const manufacturer = new Manufacturer();
    manufacturer.$id = new ObjectId().toHexString();
    manufacturer.$name = manufacturerData.$name;
    manufacturer.$phone = manufacturerData.$phone;
    manufacturer.$siret = manufacturerData.$siret;
    await this.manufacturerRepository.insert(manufacturer);
    return manufacturer;
  }

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
