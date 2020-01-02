import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OwnerInterface } from './interfaces/owner.interface';

@Entity()
export class Owner implements OwnerInterface {
  @PrimaryGeneratedColumn()
  private id: string;
  @Column()
  private name: string;
  @Column('date')
  private purchaseDate: Date;

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
}
