import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

export class UpdateCarDTO {
  public id: string;
  @IsNumber()
  @IsPositive()
  public price: number;
  @IsDate()
  public firstRegistrationDate: Date;
  @IsString()
  @IsNotEmpty()
  public manufacturerId: string;
}
