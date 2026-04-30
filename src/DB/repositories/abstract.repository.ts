// common/abstract.repository.ts
import { Repository, DeepPartial ,QueryDeepPartialEntity} from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class BaseRepository<T extends BaseEntity> {
  constructor(protected readonly repo: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<T | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: number,data: DeepPartial<T>): Promise<T> {
    await this.repo.update(id, data as QueryDeepPartialEntity<T>);
    const updated = await this.findById(id);

    if (!updated) {
      throw new Error(`Entity with id ${id} not found`);
    }

    return updated;
  }

  async delete(id: number): Promise<void> {
    const result = await this.repo.delete(id);

    if (result.affected === 0) {
      throw new Error(`Entity with id ${id} not found`);
    }
  }
}