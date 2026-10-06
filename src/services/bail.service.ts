import { AppDataSource } from '../database/data-source';
import { Bail } from '../entities/Bail.entity';
import { Locataire } from '../entities/Locataires.entity';

export class BailService {
  private bailRepo = AppDataSource.getRepository(Bail);
  private locataireRepo = AppDataSource.getRepository(Locataire);

  async createBailForLocataire(locataireId: number): Promise<Bail | null> {
    try {
      const locataire = await this.locataireRepo.findOne({
        where: { id: locataireId },
      });

      if (!locataire) {
        throw new Error('Locataire non trouvÃ©');
      }

      // VÃ©rifier s'il existe dÃ©jÃ  un bail actif
      const existingBail = await this.bailRepo.findOne({
        where: { locataire_id: locataireId, statut: 'ACTIF' } as any,
      });

      if (existingBail) {
        return existingBail;
      }

      // CrÃ©er un nouveau bail si un bien est sÃ©lectionnÃ©
      if (!locataire.biens_id) {
        return null;
      }

      const bail = this.bailRepo.create({
        locataire_id: locataireId,
        bien_id: locataire.biens_id,
        reference: `BAIL-${locataireId}-${Date.now()}`,
        loyer: locataire.biens_loyer || 0,
        baux_date_debut: new Date(),
        statut: 'ACTIF',
      } as any);

      const saved = await this.bailRepo.save(bail);
      return Array.isArray(saved) ? saved[0] : saved;
    } catch (error) {
      console.error('[BailService] Error creating bail:', error);
      return null;
    }
  }

  async findById(id: number): Promise<Bail | null> {
    return this.bailRepo.findOne({ where: { baux_bien_id: id } });
  }

  async findByLocataire(locataireId: number): Promise<Bail[]> {
    return this.bailRepo.find({
      where: { locataire_id: locataireId } as any,
      order: { baux_date_debut: 'DESC' },
    });
  }

  async update(id: number, data: Partial<Bail>): Promise<Bail> {
    await this.bailRepo.update(id, data);
    return this.findById(id) as Promise<Bail>;
  }

  async list(skip = 0, take = 20) {
    return this.bailRepo.findAndCount({
      skip,
      take,
      order: { baux_date_debut: 'DESC' },
    });
  }
}

export const bailService = new BailService();



