import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from '@modules/units/entities/unit.entity';

@Module({
  controllers: [UnitsController],
  providers: [UnitsService],
  imports: [TypeOrmModule.forFeature([Unit])],
  exports: [UnitsService],
})
export class UnitsModule {}
