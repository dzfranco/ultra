import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { CarInterface } from './interfaces/car.interface';
import { ManufacturerInterface } from '../manufacturer/interfaces/manufacturer.interface';
import { OwnerInterface } from '../owner/interfaces/owner.interface';
import { Owner } from '../owner/owner.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';

@Entity()
export class Car implements CarInterface {
  @PrimaryColumn('varchar', { length: 30 })
  private id: string;
  @ManyToOne(
    type => Manufacturer,
    manufacturer => manufacturer.$id,
  )
  private manufacturer: ManufacturerInterface;
  @Column('varchar', { length: 30 })
  private manufacturerId: string;
  @Column('float')
  private price: number;
  @Column('date')
  private firstRegistrationDate: Date;
  @ManyToMany(type => Owner)
  @JoinTable()
  private owner: OwnerInterface[];

  /**
   * Getter $id
   * @return {string}
   */
  public get $id(): string {
    return this.id;
  }

  /**
   * Setter $id
   * @param {string} value
   */
  public set $id(value: string) {
    this.id = value;
  }

  /**
   * Getter $manufacturer
   * @return {ManufacturerInterface}
   */
  public get $manufacturer(): ManufacturerInterface {
    return this.manufacturer;
  }

  /**
   * Setter $manufacturer
   * @param {ManufacturerInterface} value
   */
  public set $manufacturer(value: ManufacturerInterface) {
    this.manufacturer = value;
  }

  /**
   * Getter $manufacturerId
   * @return {string}
   */
  public get $manufacturerId(): string {
    return this.manufacturerId;
  }

  /**
   * Setter $manufacturerId
   * @param {string} value
   */
  public set $manufacturerId(value: string) {
    this.manufacturerId = value;
  }

  /**
   * Getter $price
   * @return {number}
   */
  public get $price(): number {
    return this.price;
  }

  /**
   * Setter $price
   * @param {number} value
   */
  public set $price(value: number) {
    this.price = value;
  }

  /**
   * Getter $firstRegistrationDate
   * @return {Date}
   */
  public get $firstRegistrationDate(): Date {
    return this.firstRegistrationDate;
  }

  /**
   * Setter $firstRegistrationDate
   * @param {Date} value
   */
  public set $firstRegistrationDate(value: Date) {
    this.firstRegistrationDate = value;
  }

  /**
   * Getter $owner
   * @return {OwnerInterface[]}
   */
  public get $owner(): OwnerInterface[] {
    return this.owner;
  }

  /**
   * Setter $owner
   * @param {OwnerInterface[]} value
   */
  public set $owner(value: OwnerInterface[]) {
    this.owner = value;
  }
}
