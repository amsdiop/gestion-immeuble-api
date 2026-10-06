import { Bien } from '../entities/Bien.entity';
import { AppDataSource } from '../database/data-source';

export class BienService {
  private repo = AppDataSource.getRepository(Bien);

  async findAllByImmeuble(immeuble_id: number, page = 1, limit = 20) {
    const [biens, total] = await this.repo.findAndCount({
      where: { immeuble_id },
      relations: { etage: true, baux: true } as any,
      skip: (page - 1) * limit,
      take: limit,
      order: { reference: 'ASC' },
    });

    return { biens, total, page, limit };
  }

  async findById(id: number, immeuble_id?: number) {
    const where: any = { id };
    if (immeuble_id) where.immeuble_id = immeuble_id;

    return this.repo.findOne({
      where,
      relations: { etage: true, baux: true, maintenances: true } as any,
    });
  }

  async findByReference(reference: string) {
    return this.repo.findOne({
      where: { reference },
      relations: { etage: true, baux: true } as any,
    });
  }

  async create(immeuble_id: number, data: Partial<Bien>) {
    const bien = this.repo.create({ ...data, immeuble_id });
    return this.repo.save(bien);
  }

  async update(id: number, data: Partial<Bien>, immeuble_id?: number) {
    const bien = await this.findById(id, immeuble_id);
    if (!bien) throw new Error('Bien non trouvé');

    Object.assign(bien, data);
    return this.repo.save(bien);
  }

  async delete(id: number, immeuble_id?: number) {
    const bien = await this.findById(id, immeuble_id);
    if (!bien) throw new Error('Bien non trouvé');

    return this.repo.remove(bien);
  }

  async uploadPhoto(id: number, buffer: Buffer): Promise<Bien> {
    const bien = await this.findById(id);
    if (!bien) throw new Error('Bien non trouvé');

    bien.photo = buffer;
    return this.repo.save(bien);
  }

  async getPhoto(id: number): Promise<Buffer | null> {
    const bien = await this.repo.findOne({
      where: { id },
      select: {
        photo: true,
      } as any,
    });
    return bien?.photo || null;
  }

  async updatePricingInfo(id: number, data: {
    pu?: number;
    taux_tva?: number;
    taux_marge?: number;
    taux_remise?: number;
    taux_reduction?: number;
    caution?: number;
    nettoyage?: number;
    security?: number;
  }): Promise<Bien> {
    const bien = await this.findById(id);
    if (!bien) throw new Error('Bien non trouvé');

    Object.assign(bien, data);
    return this.repo.save(bien);
  }

  async updateDisponibilite(id: number, dispo: boolean): Promise<Bien> {
    const bien = await this.findById(id);
    if (!bien) throw new Error('Bien non trouvé');

    bien.dispo = dispo ? 1 : 0;
    return this.repo.save(bien);
  }

  async list(skip = 0, take = 20) {
    return this.repo.findAndCount({
      skip,
      take,
      relations: { etage: true, immeuble: true } as any,
      order: { created_at: 'DESC' },
    });
  }
}

export const bienService = new BienService();
