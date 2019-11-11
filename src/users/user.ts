import { ApiModelProperty } from '@nestjs/swagger';

export class User {
    @ApiModelProperty({ example: 'aurelien@loyer.fr' })
    email: string;
    @ApiModelProperty({ example: 'product' })
    password: string;
}
