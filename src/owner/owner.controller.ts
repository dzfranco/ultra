import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { CreateOwnerDTO } from './dto/create-owner.dto';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { OwnerService } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  public async createOwner(@Body() createOwnerDTO: CreateOwnerDTO) {
    const owner = await this.ownerService.createOwner(createOwnerDTO);
    return owner;
  }
}
