import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@modules/product/entities/product.entity';
import { ShoppingListItem } from '@entities/shopping-list-item.entity/shopping-list.item.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [TypeOrmModule.forFeature([Product, ShoppingListItem])],
})
export class ProductModule {}
