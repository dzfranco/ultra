import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CarInterface } from './interfaces/car.interface';
import { ManufacturerInterface } from '../manufacturer/interfaces/manufacturer.interface';
import { OwnerInterface } from '../owner/interfaces/owner.interface';
import { Owner } from '../owner/owner.entity';

@Entity()
export class Car implements CarInterface {
  @PrimaryGeneratedColumn()
  private id: string;
  private manufacturer: ManufacturerInterface;
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
