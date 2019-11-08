import { ApiModelProperty } from '@nestjs/swagger';
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
  @ApiModelProperty({ example: 12 })
  readonly id: number;

  @IsString()
  @ApiModelProperty({ example: 'Super product' })
  readonly label?: string;

  @IsString()
  @Length(10, 80)
  @ApiModelProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ...',
  })
  readonly description?: string;

  @Validate(ExtensionValidator)
  @ApiModelProperty({ example: '' })
  readonly image?: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @ApiModelProperty({ example: 15.0 })
  readonly price?: number;

  @IsInt()
  @ApiModelProperty({ example: 5 })
  stock?: number;
}
