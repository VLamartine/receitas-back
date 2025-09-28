import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShoppingList } from '@modules/shopping-list/entities/shopping-list.entity';
import { Product } from '@modules/product/entities/product.entity';
import { Unit } from '@modules/units/entities/unit.entity';

@Entity()
export class ShoppingListItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shoppingListId: string;

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @Column()
  unitId: string;

  @ManyToOne(() => Unit)
  unit: Unit;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => ShoppingList, shoppingList => shoppingList.shoppingListItems)
  shoppingList: ShoppingList;

  @ManyToOne(() => Product, product => product.shoppingListItems)
  product: Product;
}
