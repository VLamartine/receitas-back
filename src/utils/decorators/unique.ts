import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueConstraint } from '@utils/validators/unique/unique';
import { UniqueInterface } from '@utils/interfaces/unique-interface.interface';

export default function unique(
  options: UniqueInterface,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'Unique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: UniqueConstraint,
    });
  };
}
