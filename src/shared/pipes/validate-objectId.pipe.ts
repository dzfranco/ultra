import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import ObjectId from 'bson-objectid';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (ObjectId.isValid(value)) {
      return value;
    } else {
      throw new BadRequestException('Id Validation Failed');
    }
  }
}
