import { Controller, Post, UsePipes, Body } from '@nestjs/common';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CreateManufacturerDTO } from './dto/create-manufacturer.dto';
import { ManufacturerService } from './manufacturer.service';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @UsePipes(new ValidationPipe())
  @Post('')
  public async createManufacturer(
    @Body() createManufacturerDTO: CreateManufacturerDTO,
  ) {
    const manufacturer = await this.manufacturerService.createManufacturer(
      createManufacturerDTO,
    );
    return manufacturer;
  }
}
