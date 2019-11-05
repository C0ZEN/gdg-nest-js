import { Get, Controller, Render, Param, Res, Put, Body, HttpException, HttpStatus, Post, ParseIntPipe, Delete, HttpCode } from '@nestjs/common';
import productsJson from './../static/data/products.json';
import { Product } from './product';

@Controller()
export class AppController {

    products: Product[] = productsJson;

    @Get()
    @Render('index')
    root() {
        return { message: 'Hello world ! 🦄' };
    }

    @Get('static/img/:imageName')
    image(@Param('imageName') imageName, @Res() res) {
        return res.sendFile(`img/${imageName}`, { root: 'static' });
    }

    @Get('product')
    findAll(): any[] {
        return this.products;
    }

    @Put('product')
    create(@Body() product: any) {
        if (this.products.length > 5) {
            throw new HttpException(
                `Too much products added !`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        this.products.push(product);
        return product;
    }

    @Get('product/:id')
    findOne(@Param('id', new ParseIntPipe()) id: number): Product {
        const product: Product = this.products.find(pro => pro.id === id);
        if (product === undefined) {
            throw new HttpException(
                `Cannot find a product 🤔 with id ${id}`,
                HttpStatus.NOT_FOUND,
            );
        }
        return product;
    }

    @Post('product')
    update(@Body() productToUpdate: any) {
        const productIndex = this.products.findIndex((product: Product) => product.id === productToUpdate.id);
        if (productIndex === -1) {
            throw new HttpException(
                `Cannot find a product with id ${productToUpdate.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
        this.products[productIndex] = productToUpdate;
        return productToUpdate;
    }

    @Delete('product/:id')
    @HttpCode(204)
    delete(@Param('id', new ParseIntPipe()) id: number) {
        const productIndex = this.products.findIndex((product: Product) => product.id === id);
        if (productIndex < 0) {
            throw new HttpException(
                `Cannot find a product 🤔 with id ${id}`,
                HttpStatus.NOT_FOUND,
            );
        }
        this.products.splice(productIndex, 1);
    }
}
