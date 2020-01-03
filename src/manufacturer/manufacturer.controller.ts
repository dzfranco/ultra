import {
  Controller,
  Post,
  UsePipes,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
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

  @Delete(':id')
  public async removeManufacturer(
    @Param('id', new ValidationPipe()) id: string,
  ) {
    const manufacturer = await this.manufacturerService.removeManufacturer(id);
    return manufacturer;
  }
}
