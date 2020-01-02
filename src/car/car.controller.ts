import { Controller, Get } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  @Get()
  public findAll(): string {
    return 'Testing complete';
  }
}
