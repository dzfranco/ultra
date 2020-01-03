import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsNumber,
  IsInt,
} from 'class-validator';

export class CreateManufacturerDTO {
  @IsNotEmpty()
  @IsString()
  private name: string;
  @IsNumberString()
  private phone: string;
  @IsNumber()
  @IsInt()
  private siret: number;

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
