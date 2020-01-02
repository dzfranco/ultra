import { IsInt, Min, Max } from 'class-validator';

export class ListCarDto {
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number;
  previousCursor: string;
}
