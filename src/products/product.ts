import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ example: 12 } as ApiPropertyOptions)
  readonly id: number;

  @ApiProperty({ example: 'Super product' } as ApiPropertyOptions)
  readonly label?: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ...',
  } as ApiPropertyOptions)
  readonly description?: string;

  @ApiProperty({ example: '' } as ApiPropertyOptions)
  readonly image?: string;

  @ApiProperty({ example: 15.0 } as ApiPropertyOptions)
  readonly price?: number;

  @ApiProperty({ example: 5 } as ApiPropertyOptions)
  stock?: number;
}
