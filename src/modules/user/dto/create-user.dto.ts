import { IsEmail, IsNotEmpty } from 'class-validator';
import Unique from '@utils/decorators/unique';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @Unique({ tableName: 'user', column: 'email' })
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
