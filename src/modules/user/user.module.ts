import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '@modules/auth/auth.module';
import { ShoppingList } from '@modules/shopping-list/entities/shopping-list.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, ShoppingList]),
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
