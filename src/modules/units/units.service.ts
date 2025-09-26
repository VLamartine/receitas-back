import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from '@modules/units/entities/unit.entity';
import { Repository } from 'typeorm';
import ResponseMapper from '@utils/helpers/ResponseMapper';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit) private readonly unitRepository: Repository<Unit>
  ) {}

  create(createUnitDto: CreateUnitDto) {
    return 'This action adds a new unit';
  }

  async findAll() {
    const [data, total] = await this.unitRepository.findAndCount();

    return ResponseMapper.mapResponse(data, {
      total,
      currentPage: 1,
      totalPages: 1,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} unit`;
  }

  update(id: number, updateUnitDto: UpdateUnitDto) {
    return `This action updates a #${id} unit`;
  }

  remove(id: number) {
    return `This action removes a #${id} unit`;
  }
}
