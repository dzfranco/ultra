import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

export class CreateCarDTO {
  @IsNumber()
  @IsPositive()
  public readonly price: number;
  @IsDate()
  public readonly firstRegistrationDate: Date;
  @IsString()
  @IsNotEmpty()
  public readonly manufacturerId: string;
}
