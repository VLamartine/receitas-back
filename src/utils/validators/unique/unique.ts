import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { UniqueInterface } from '@utils/interfaces/unique-interface.interface';

@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const { tableName, column }: UniqueInterface = args?.constraints[0];

    const result = await this.entityManager.getRepository(tableName).findOne({
      where: { [column]: value },
    });

    return !result;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const field: string = validationArguments.property;
    return `${field} already exists`;
  }
}
