import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import {
  IsNumber,
  Validate,
  IsString,
  Length,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { UuidValidator } from './validators/id.validator';
import { ExtensionValidator } from './validators/extension.validator';

export class Product {
  @IsNumber()
  @Validate(UuidValidator)
  @ApiProperty({ example: 12 } as ApiPropertyOptions)
  readonly id: number;

  @IsString()
  @ApiProperty({ example: 'Super product' } as ApiPropertyOptions)
  readonly label?: string;

  @IsString()
  @Length(10, 80)
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ...',
  } as ApiPropertyOptions)
  readonly description?: string;

  @Validate(ExtensionValidator)
  @ApiProperty({ example: '' } as ApiPropertyOptions)
  readonly image?: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty({ example: 15.0 } as ApiPropertyOptions)
  readonly price?: number;

  @IsInt()
  @ApiProperty({ example: 5 } as ApiPropertyOptions)
  stock?: number;
}
