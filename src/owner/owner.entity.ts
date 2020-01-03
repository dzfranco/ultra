import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { OwnerInterface } from './interfaces/owner.interface';
import { Car } from '../car/car.entity';

@Entity()
export class Owner implements OwnerInterface {
  @PrimaryColumn('varchar', { length: 30 })
  private id: string;
  @Column()
  private name: string;
  @Column('date')
  private purchaseDate: Date;
  @Column({ length: 30 })
  private carId: string;

  @ManyToOne(
    type => Car,
    car => car.$owner,
  )
  private car: Car;

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
   * Getter $name
   * @return {string}
   */
  public get $name(): string {
    return this.name;
  }

  /**
   * Setter $name
   * @param {string} value
   */
  public set $name(value: string) {
    this.name = value;
  }

  /**
   * Getter $purchaseDate
   * @return {Date}
   */
  public get $purchaseDate(): Date {
    return this.purchaseDate;
  }

  /**
   * Setter $purchaseDate
   * @param {Date} value
   */
  public set $purchaseDate(value: Date) {
    this.purchaseDate = value;
  }

  /**
   * Getter $car
   * @return {Car}
   */
  public get $car(): Car {
    return this.car;
  }

  /**
   * Setter $car
   * @param {Car} value
   */
  public set $car(value: Car) {
    this.car = value;
  }

  /**
   * Getter $carId
   * @return {string}
   */
  public get $carId(): string {
    return this.carId;
  }

  /**
   * Setter $carId
   * @param {string} value
   */
  public set $carId(value: string) {
    this.carId = value;
  }
}
