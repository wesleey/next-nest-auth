import { Entity } from '@/core/base/entity';
import { Repository } from '@/core/base/repository';
import { randomUUID } from 'node:crypto';

export class RepositoryCacheMemory<
  TEntity extends Entity,
> extends Repository<TEntity> {
  protected readonly items: TEntity[];

  constructor() {
    super();
    this.items = [];
  }

  async create(data: TEntity): Promise<TEntity> {
    data.id = randomUUID();
    const count = this.items.push(data);
    return this.items[count - 1];
  }

  async findAll(filter?: Partial<TEntity>): Promise<TEntity[]> {
    let filtered = this.items;
    for (const key in filter) {
      filtered = filtered.filter((item) => item[key] === filter[key]);
    }
    return filtered;
  }

  async findOne(filter: Partial<TEntity>): Promise<TEntity> {
    return this.findAll(filter).then((items) =>
      items.length > 0 ? items[0] : null,
    );
  }

  async update(id: string, data: Partial<TEntity>): Promise<TEntity> {
    const index = this.getIndexById(id);
    if (index === -1) {
      // TODO: handle the case of not finding the item to update
    }
    for (const key in data) {
      this.items[index][key] = data[key];
    }
    return this.items[index];
  }

  async remove(id: string): Promise<void> {
    const index = this.getIndexById(id);
    if (index === -1) {
      // TODO: handle the case of not finding the item to be deleted
    }
    this.items.splice(index, 1);
  }

  private getIndexById(id: string) {
    return this.items.findIndex((item) => item.id === id);
  }
}
