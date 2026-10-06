import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User.entity';
import { Bien } from '../entities/Bien.entity';
import { Locataire } from '../entities/Locataires.entity';
import { Immeuble } from '../entities/Immeuble.entity';
import { Bail } from '../entities/Bail.entity';
import { Paiement } from '../entities/Paiement.entity';
import { Document } from '../entities/Document.entity';
import { Maintenance } from '../entities/Maintenance.entity';
import { Notification } from '../entities/Notification.entity';
import { Depense } from '../entities/Depense.entity';
import { TitreCourtoisie } from '../entities/TitreCourtoisie.entity';
import { Etage } from '../entities/Etage.entity';

export class DashboardService {
  private compteRepo = AppDataSource.getRepository(User);
  private bienRepo = AppDataSource.getRepository(Bien);
  private locataireRepo = AppDataSource.getRepository(Locataire);
  private immeubleRepo = AppDataSource.getRepository(Immeuble);
  private bailRepo = AppDataSource.getRepository(Bail);
  private paiementRepo = AppDataSource.getRepository(Paiement);
  private documentRepo = AppDataSource.getRepository(Document);
  private maintenanceRepo = AppDataSource.getRepository(Maintenance);
  private notificationRepo = AppDataSource.getRepository(Notification);
  private depenseRepo = AppDataSource.getRepository(Depense);
  private titreCourtoisieRepo = AppDataSource.getRepository(TitreCourtoisie);
  private etageRepo = AppDataSource.getRepository(Etage);

  async getStatistics() {
    const totalComptes = await this.compteRepo.count();
    const activeComptes = await this.compteRepo.count({ where: { users_actif: 1 } });

    const totalBiens = await this.bienRepo.count();
    const activeBiens = await this.bienRepo.count({ where: { actif: 1, dispo: 1 } });

    const totalLocataire = await this.locataireRepo.count();
    const activeLocataire = await this.locataireRepo.count({ where: { actif: 1 } });

    const totalImmeubles = await this.immeubleRepo.count();
    const activeImmeubles = await this.immeubleRepo.count({ where: { actif: 1 } });

    const totalBaux = await this.bailRepo.count();
    const activeBaux = await this.bailRepo.count({ where: { statut: 'ACTIF' } as any });

    const totalPaiements = await this.paiementRepo.count();
    const totalDocuments = await this.documentRepo.count();
    const totalEtages = await this.etageRepo.count();
    const totalMaintenance = await this.maintenanceRepo.count();
    const totalNotifications = await this.notificationRepo.count();
    const totalDepenses = await this.depenseRepo.count();
    const totalTitresCourtoisie = await this.titreCourtoisieRepo.count();

    // Calcul des revenus
    const loyersResult = await this.bailRepo.query(
      `SELECT COALESCE(SUM(b.loyer), 0) as total_loyers
       FROM baux b WHERE b.statut = 'ACTIF'`
    );
    const totalLoyersRevenue = loyersResult[0]?.total_loyers || 0;

    return {
      comptes: {
        total: totalComptes,
        active: activeComptes,
        inactive: totalComptes - activeComptes,
      },
      biens: {
        total: totalBiens,
        active: activeBiens,
        available: activeBiens,
        occupied: totalBiens - activeBiens,
      },
      Locataire: {
        total: totalLocataire,
        active: activeLocataire,
        inactive: totalLocataire - activeLocataire,
      },
      immeubles: {
        total: totalImmeubles,
        active: activeImmeubles,
        inactive: totalImmeubles - activeImmeubles,
      },
      baux: {
        total: totalBaux,
        active: activeBaux,
        inactive: totalBaux - activeBaux,
      },
      revenue: {
        monthly_loyers: totalLoyersRevenue,
        currency: 'XOF', // Francs CFA
      },
    };
  }

  async getRecentActivity(limit = 10) {
    const recentComptes = await this.compteRepo.find({
      order: { users_created_at: 'DESC' },
      take: limit,
    });

    const recentLocataire = await this.locataireRepo.find({
      order: { created_at: 'DESC' },
      take: limit,
    });

    const recentBiens = await this.bienRepo.find({
      order: { created_at: 'DESC' },
      take: limit,
    });

    return {
      recent_comptes: recentComptes,
      recent_Locataire: recentLocataire,
      recent_biens: recentBiens,
    };
  }

  async getImmeublesSummary() {
    const immeubles = await this.immeubleRepo.find({
      relations: { etages: true } as any,
    });

    return immeubles.map((immeuble) => ({
      id: immeuble.id,
      nom: immeuble.nom,
      adresse: immeuble.adresse,
      total_etages: (immeuble as any).etages?.length || 0,
      actif: immeuble.actif === 1,
    }));
  }
}

export const dashboardService = new DashboardService();





