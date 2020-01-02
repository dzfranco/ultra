import {
  IsNumber,
  IsPositive,
  IsDateString,
  IsInt,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateCarDTO {
  @IsNumber()
  @IsPositive()
  public readonly price: number;
  @IsDateString()
  public readonly firstRegistrationDate: Date;
  @IsString()
  @IsNotEmpty()
  public readonly manufacturerId: string;
}
