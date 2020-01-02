import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Manufacturer {
  @PrimaryGeneratedColumn()
  private id: string;
  @Column()
  private name: string;
  @Column()
  private phone: string;
  @Column('int')
  private siret: number;

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
   * Getter $phone
   * @return {string}
   */
  public get $phone(): string {
    return this.phone;
  }

  /**
   * Setter $phone
   * @param {string} value
   */
  public set $phone(value: string) {
    this.phone = value;
  }

  /**
   * Getter $siret
   * @return {number}
   */
  public get $siret(): number {
    return this.siret;
  }

  /**
   * Setter $siret
   * @param {number} value
   */
  public set $siret(value: number) {
    this.siret = value;
  }
}
