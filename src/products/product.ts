import { ApiModelProperty } from '@nestjs/swagger';

export class Product {
  @ApiModelProperty({ example: 12 })
  readonly id: number;

  @ApiModelProperty({ example: 'Super product' })
  readonly label?: string;

  @ApiModelProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ...',
  })
  readonly description?: string;

  @ApiModelProperty({ example: '' })
  readonly image?: string;

  @ApiModelProperty({ example: 15.0 })
  readonly price?: number;

  @ApiModelProperty({ example: 5 })
  readonly stock?: number;
}
