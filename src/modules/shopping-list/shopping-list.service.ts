import { Injectable } from '@nestjs/common';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingList } from '@modules/shopping-list/entities/shopping-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectRepository(ShoppingList)
    private readonly repository: Repository<ShoppingList>
  ) {}
  async create(createShoppingListDto: CreateShoppingListDto) {
    const shoppingListEntity = this.repository.create({
      name: createShoppingListDto.name,
      description: createShoppingListDto.description,
      purchaseDate: createShoppingListDto.purchaseDate,
      userId: createShoppingListDto.userId,
      shoppingListItems: createShoppingListDto.shoppingListItems?.map(item => ({
        quantity: item.quantity,
        unitId: item.unit,
        productId: item.productId,
      })),
    });

    return this.repository.save(shoppingListEntity);
  }

  findAll() {
    return `This action returns all shoppingList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingList`;
  }

  update(id: number, updateShoppingListDto: UpdateShoppingListDto) {
    return `This action updates a #${id} shoppingList`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingList`;
  }
}
