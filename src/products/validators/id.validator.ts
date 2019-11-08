import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ProductsService } from '../products.service';

@Injectable()
@ValidatorConstraint({ name: 'uuidValidator', async: false })
export class UuidValidator implements ValidatorConstraintInterface {
  constructor(private readonly productsService: ProductsService) {}

  validate(id: number, args: ValidationArguments) {
    const isExistingId = this.productsService
      .findAll()
      .some(product => product.id === id);
    return !isExistingId;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `Erreur: 'id' doit etre unique 😨`;
  }
}
