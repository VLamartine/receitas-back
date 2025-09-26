import { Module } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingListItem } from '@entities/shopping-list-item.entity/shopping-list.item.entity';
import { ShoppingList } from '@modules/shopping-list/entities/shopping-list.entity';
import { User } from '@modules/user/entities/user.entity';

@Module({
  controllers: [ShoppingListController],
  providers: [ShoppingListService],
  imports: [TypeOrmModule.forFeature([ShoppingList, ShoppingListItem, User])],
})
export class ShoppingListModule {}
