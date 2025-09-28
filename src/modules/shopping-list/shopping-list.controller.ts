import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import Request from 'express';
import { ShoppingList } from './entities/shopping-list.entity';

@Controller('shopping-list')
@UseGuards(JwtAuthGuard)
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createShoppingListDto: CreateShoppingListDto
  ): Promise<ShoppingList> {
    createShoppingListDto.userId = req.user.userId;
    return this.shoppingListService.create(createShoppingListDto);
  }

  @Get()
  findAll() {
    return this.shoppingListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingListService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShoppingListDto: UpdateShoppingListDto
  ) {
    return this.shoppingListService.update(+id, updateShoppingListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingListService.remove(+id);
  }
}
