import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from '@modules/units/entities/unit.entity';
import { Repository } from 'typeorm';
import { Product } from '@modules/product/entities/product.entity';
import ResponseMapper from '@utils/helpers/ResponseMapper';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(options: Record<string, any>) {
    const { search } = options;

    const query = this.productsRepository.createQueryBuilder('product');
    if (search) {
      query.where('LOWER(product.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const [data, total] = await query.getManyAndCount();
    return ResponseMapper.mapResponse(data, {
      total,
      currentPage: 1,
      totalPages: 1,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
