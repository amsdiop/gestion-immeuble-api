import { Router, Request, Response } from 'express';
import { dashboardService } from '../services/dashboard.service';

const router = Router();

// GET /api/v1/dashboard/statistics - Cartes principales
router.get('/statistics', async (req: Request, res: Response) => {
  try {
    const stats = await dashboardService.getStatistics();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    console.error('[Dashboard] Statistics error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/dashboard/activity - Activité récente
router.get('/activity', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const activity = await dashboardService.getRecentActivity(limit);

    res.json({
      success: true,
      data: activity,
    });
  } catch (error: any) {
    console.error('[Dashboard] Activity error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/dashboard/immeubles - Résumé des immeubles
router.get('/immeubles', async (req: Request, res: Response) => {
  try {
    const summary = await dashboardService.getImmeublesSummary();

    res.json({
      success: true,
      data: summary,
    });
  } catch (error: any) {
    console.error('[Dashboard] Immeubles error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
