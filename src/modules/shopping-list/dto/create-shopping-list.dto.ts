import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateShoppingListItemDto {
  @IsNotEmpty()
  @IsUUID()
  productId?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsUUID()
  unit: string;
}

export class CreateShoppingListDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  purchaseDate?: Date;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => CreateShoppingListItemDto)
  shoppingListItems: CreateShoppingListItemDto[];

  @IsOptional()
  @IsUUID()
  userId?: string;
}