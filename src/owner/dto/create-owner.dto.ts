import { IsDate, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateOwnerDTO {
  @IsDate()
  private purchaseDate: Date;
  @IsNotEmpty()
  @IsString()
  private name: string;
  @Matches(/^[a-f\d]{24}$/i, { message: 'Must be a valid ObjectId' })
  private carId: string;

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
