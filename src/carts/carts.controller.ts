import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { Cart } from './entities/cart.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../decorators/user';
import { ProductsService } from 'src/products/products.service';

@Controller('api/v1/cart')
@ApiUseTags('cart')
export class CartsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly logger: Logger,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put()
  @ApiOperation({ title: 'Create a basket for the user' })
  create(@User() user): Cart {
    this.logger.log(`Calling PUT /api/v1/cart`);

    const newCart: Cart = {
      id: user.id,
      creationDate: new Date(),
      products: [],
    };

    user.cart = newCart;

    return user.cart;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ title: 'Get the basket of the user' })
  findOne(@User() user): Cart {
    this.logger.log(`Calling GET /api/v1/cart`);
    return user.cart;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ title: 'Add an array of productId to the basket of the user' })
  update(@User() user, @Body() products: number[]): Cart {
    this.logger.log(`Calling POST /api/v1/cart`);
    if (!user.cart.products) {
      throw new HttpException(
        `Cart not found, first create an empty cart 🛒 (PUT)`,
        HttpStatus.NOT_FOUND,
      );
    }

    products.forEach(productId => {
      if (this.productsService.isStockAvailable(productId)) {
        if (this.productsService.decreaseStock(productId)) {
          user.cart.products.push(productId);
        } else {
          throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
        }
      } else {
        throw new HttpException(
          `Product id ${productId} not available 😅`,
          HttpStatus.NOT_FOUND,
        );
      }
    });
    return user.cart;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  @ApiOperation({ title: 'Reset the basket of the user' })
  delete(@User() user): Cart {
    this.logger.log(`Calling DELETE /api/v1/cart`);

    user.cart = {};
    return user.cart;
  }
}
