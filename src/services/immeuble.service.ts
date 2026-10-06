import { Immeuble } from '../entities/Immeuble.entity';
import { AppDataSource } from '../database/data-source';

export class ImmeubleService {
  private repo = AppDataSource.getRepository(Immeuble);

  async findAll(users_id: number, page = 1, limit = 10) {
    const [immeubles, total] = await this.repo.findAndCount({
      where: { users_id },
      relations: { etages: true } as any,
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
    });

    return { immeubles, total, page, limit };
  }

  async findById(id: number, users_id: number) {
    return this.repo.findOne({
      where: { id, users_id },
      relations: { etages: { biens: true } } as any,
    });
  }

  async create(users_id: number, data: Partial<Immeuble>) {
    const immeuble = this.repo.create({ ...data, users_id });
    return this.repo.save(immeuble);
  }

  async update(id: number, users_id: number, data: Partial<Immeuble>) {
    const immeuble = await this.findById(id, users_id);
    if (!immeuble) throw new Error('Immeuble non trouvÃ©');

    Object.assign(immeuble, data);
    return this.repo.save(immeuble);
  }

  async delete(id: number, users_id: number) {
    const immeuble = await this.findById(id, users_id);
    if (!immeuble) throw new Error('Immeuble non trouvÃ©');

    return this.repo.remove(immeuble);
  }
}

export const immeubleService = new ImmeubleService();

