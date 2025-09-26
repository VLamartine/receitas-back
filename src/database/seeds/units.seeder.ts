import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Unit } from '@modules/units/entities/unit.entity';

export default class UnitsSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Unit);

    await repository.save([
      {
        name: 'Quilogramas',
        symbol: 'kg',
      },
      {
        name: 'Gramas',
        symbol: 'g',
      },

      {
        name: 'Litros',
        symbol: 'L',
      },
      {
        name: 'Mililitros',
        symbol: 'ml',
      },

      {
        name: 'Unidades',
        symbol: 'unidades',
      },
      {
        name: 'Caixas',
        symbol: 'caixas',
      },
      {
        name: 'Latas',
        symbol: 'latas',
      },
      {
        name: 'Pacote',
        symbol: 'pacotes',
      },
    ]);
  }
}
