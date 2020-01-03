import { Module } from '@nestjs/common';
import { CarModule } from '../car/car.module';
import { OwnerModule } from '../owner/owner.module';
import { TriggersController } from './triggers.controller';

@Module({
  imports: [CarModule, OwnerModule],
  controllers: [TriggersController],
})
export class TriggersModule {}
