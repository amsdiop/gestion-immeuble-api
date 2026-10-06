import express, { Router } from 'express';
import { locataireService } from '../services/locataires.service';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const locataire = await locataireService.getById(Number(req.params.id));
    res.json({ success: !!locataire, data: locataire });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erreur' });
  }
});

export default router;
