import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { cnpj } from 'cpf-cnpj-validator'; // Library for CNPJ validation

@ValidatorConstraint({ name: 'isCnpj', async: false })
export class IsCnpjConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return cnpj.isValid(value); // Validate CNPJ using the library
  }

  defaultMessage(args: ValidationArguments) {
    return 'CNPJ is invalid!';
  }
}
