import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShoppingListItem } from '@entities/shopping-list-item.entity/shopping-list.item.entity';
import { User } from '@modules/user/entities/user.entity';

@Entity()
export class ShoppingList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  purchaseDate: Date;

  @Column()
  userId: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(
    () => ShoppingListItem,
    (shoppingListItem: ShoppingListItem) => shoppingListItem.shoppingList
  )
  shoppingListItems: ShoppingListItem[];

  @ManyToOne(() => User, (user: User) => user.shoppingLists)
  user: User;
}
