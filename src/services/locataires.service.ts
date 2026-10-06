import { AppDataSource } from '../database/data-source';
import { Locataire } from '../entities/Locataires.entity';

export class LocataireService {
  private locataireRepo = AppDataSource.getRepository(Locataire);

  async getById(id: number): Promise<Locataire | null> {
    return this.locataireRepo.findOne({ where: { id } });
  }

  async getByCompteId(compteId: number): Promise<Locataire[]> {
    return this.locataireRepo.find({ where: { users_id: compteId } });
  }

  async create(data: Partial<Locataire>): Promise<Locataire> {
    const locataire = this.locataireRepo.create(data);
    return this.locataireRepo.save(locataire);
  }

  async update(id: number, data: Partial<Locataire>): Promise<Locataire> {
    await this.locataireRepo.update(id, data);
    return this.getById(id) as Promise<Locataire>;
  }

  async uploadPieceIdentitePhoto(id: number, buffer: Buffer): Promise<Locataire> {
    await this.locataireRepo.update(id, { piece_identite_photo: buffer });
    return this.getById(id) as Promise<Locataire>;
  }

  async getPieceIdentitePhoto(id: number): Promise<Buffer | null> {
    const locataire = await this.locataireRepo.findOne({
      where: { id },
      select: {
        piece_identite_photo: true,
      } as any,
    });
    return locataire?.piece_identite_photo || null;
  }

  async uploadPhoto(id: number, buffer: Buffer): Promise<Locataire> {
    await this.locataireRepo.update(id, { photo: buffer });
    return this.getById(id) as Promise<Locataire>;
  }

  async getPhoto(id: number): Promise<Buffer | null> {
    const locataire = await this.locataireRepo.findOne({
      where: { id },
      select: {
        photo: true,
      } as any,
    });
    return locataire?.photo || null;
  }

  async uploadSignature(id: number, buffer: Buffer): Promise<Locataire> {
    await this.locataireRepo.update(id, { signature: buffer });
    return this.getById(id) as Promise<Locataire>;
  }

  async getSignature(id: number): Promise<Buffer | null> {
    const locataire = await this.locataireRepo.findOne({
      where: { id },
      select: {
        signature: true,
      } as any,
    });
    return locataire?.signature || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.locataireRepo.delete(id);
    return (result.affected || 0) > 0;
  }

  async list(skip: number = 0, take: number = 10): Promise<[Locataire[], number]> {
    return this.locataireRepo.findAndCount({
      skip,
      take,
      order: { created_at: 'DESC' },
    });
  }
}

export const locataireService = new LocataireService();



