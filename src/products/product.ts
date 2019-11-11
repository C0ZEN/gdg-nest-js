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
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class Product {
  @IsNumber()
  @Validate(UuidValidator)
  @ApiModelProperty({ example: 12 })
  @Field(() => Int)
  readonly id: number;

  @IsString()
  @ApiModelProperty({ example: 'Super product' })
  @Field()
  readonly label?: string;

  @IsString()
  @Length(10, 80)
  @ApiModelProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ...',
  })
  @Field()
  readonly description?: string;

  @Validate(ExtensionValidator)
  @ApiModelProperty({ example: '' })
  @Field()
  readonly image?: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @ApiModelProperty({ example: 15.0 })
  @Field(() => Int)
  readonly price?: number;

  @IsInt()
  @ApiModelProperty({ example: 5 })
  @Field(() => Int)
  stock?: number;
}
