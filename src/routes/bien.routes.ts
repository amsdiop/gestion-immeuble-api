import { Router, Request, Response } from 'express';
import multer from 'multer';
import { bienService } from '../services/bien.service';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

interface BienRequest extends Request {
  file?: Express.Multer.File;
}

// GET /api/v1/biens - Lister tous les biens
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [biens, total] = await bienService.list(skip, limit);

    res.json({
      success: true,
      data: biens,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('[Bien] List error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/biens/:id - Récupérer un bien
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const bien = await bienService.findById(parseInt(req.params.id as string));

    if (!bien) {
      return res.status(404).json({ success: false, error: 'Bien non trouvé' });
    }

    res.json({
      success: true,
      data: {
        id: bien.id,
        reference: bien.reference,
        designation: bien.designation,
        type_bien: bien.type_bien,
        immeuble_id: bien.immeuble_id,
        etage_id: bien.etage_id,
        pu: bien.pu,
        dispo: bien.dispo === 1,
        caution: bien.caution,
        nettoyage: bien.nettoyage,
        security: bien.security,
        taux_tva: bien.taux_tva,
        taux_marge: bien.taux_marge,
        taux_remise: bien.taux_remise,
        taux_reduction: bien.taux_reduction,
        montant_ht: bien.montant_ht,
        montant_tva: bien.montant_tva,
        loyer: bien.loyer,
        has_photo: !!bien.photo,
        actif: bien.actif === 1,
        created_at: bien.created_at,
        updated_at: bien.updated_at,
      },
    });
  } catch (error: any) {
    console.error('[Bien] Get error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/biens - Créer un bien
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      reference,
      designation,
      type_bien,
      immeuble_id,
      etage_id,
      pu,
      dispo,
      caution,
      nettoyage,
      security,
      taux_tva,
      taux_marge,
      taux_remise,
      taux_reduction,
    } = req.body;

    const bien = await bienService.create(immeuble_id, {
      reference,
      designation,
      type_bien,
      etage_id,
      pu,
      dispo: dispo ? 1 : 0,
      caution,
      nettoyage,
      security,
      taux_tva,
      taux_marge,
      taux_remise,
      taux_reduction,
    });

    res.status(201).json({
      success: true,
      message: 'Bien créé avec succès',
      data: bien,
    });
  } catch (error: any) {
    console.error('[Bien] Create error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/v1/biens/:id - Mettre à jour un bien
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const bien = await bienService.update(parseInt(req.params.id as string), req.body);

    res.json({
      success: true,
      message: 'Bien mis à jour avec succès',
      data: bien,
    });
  } catch (error: any) {
    console.error('[Bien] Update error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/v1/biens/:id - Supprimer un bien
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await bienService.delete(parseInt(req.params.id as string));

    res.json({
      success: true,
      message: 'Bien supprimé avec succès',
    });
  } catch (error: any) {
    console.error('[Bien] Delete error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/biens/:id/photo - Upload photo
router.post('/:id/photo', upload.single('file'), async (req: BienRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Aucun fichier fourni' });
    }

    const bien = await bienService.uploadPhoto(parseInt(req.params.id as string), req.file.buffer);

    res.json({
      success: true,
      message: 'Photo uploadée avec succès',
      data: {
        id: bien.id,
        uploaded_at: new Date(),
      },
    });
  } catch (error: any) {
    console.error('[Bien] Upload photo error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/biens/:id/photo - Télécharger photo
router.get('/:id/photo', async (req: Request, res: Response) => {
  try {
    const buffer = await bienService.getPhoto(parseInt(req.params.id as string));

    if (!buffer) {
      return res.status(404).json({ success: false, error: 'Photo non trouvée' });
    }

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `inline; filename="bien_${req.params.id}.jpg"`);
    res.send(buffer);
  } catch (error: any) {
    console.error('[Bien] Get photo error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/v1/biens/:id/pricing - Mettre à jour tarification et frais
router.put('/:id/pricing', async (req: Request, res: Response) => {
  try {
    const bien = await bienService.updatePricingInfo(parseInt(req.params.id as string), req.body);

    res.json({
      success: true,
      message: 'Tarification mise à jour avec succès',
      data: {
        id: bien.id,
        pu: bien.pu,
        taux_tva: bien.taux_tva,
        taux_marge: bien.taux_marge,
        taux_remise: bien.taux_remise,
        taux_reduction: bien.taux_reduction,
        montant_ht: bien.montant_ht,
        montant_tva: bien.montant_tva,
        loyer: bien.loyer,
        caution: bien.caution,
        nettoyage: bien.nettoyage,
        security: bien.security,
      },
    });
  } catch (error: any) {
    console.error('[Bien] Update pricing error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/v1/biens/:id/dispo - Mettre à jour disponibilité
router.put('/:id/dispo', async (req: Request, res: Response) => {
  try {
    const { dispo } = req.body;
    const bien = await bienService.updateDisponibilite(parseInt(req.params.id as string), dispo);

    res.json({
      success: true,
      message: 'Disponibilité mise à jour',
      data: {
        id: bien.id,
        dispo: bien.dispo === 1,
      },
    });
  } catch (error: any) {
    console.error('[Bien] Update dispo error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
