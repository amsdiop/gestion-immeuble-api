import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { immeubleService } from '../services/immeuble.service';

export class ImmeubleController {
  async getAll(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ error: 'Non authentifiÃ©' });

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await immeubleService.findAll(req.user.users_id, page, limit);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  }

  async getById(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ error: 'Non authentifiÃ©' });

      const immeuble = await immeubleService.findById(
        parseInt(req.params.id as string),
        req.user.users_id
      );
      if (!immeuble) return res.status(404).json({ error: 'Non trouvÃ©' });

      res.json({ success: true, data: immeuble });
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  }

  async create(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ error: 'Non authentifiÃ©' });

      const immeuble = await immeubleService.create(req.user.users_id, req.body);
      res.status(201).json({ success: true, data: immeuble });
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ error: 'Non authentifiÃ©' });

      const immeuble = await immeubleService.update(
        parseInt(req.params.id as string),
        req.user.users_id,
        req.body
      );
      res.json({ success: true, data: immeuble });
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ error: 'Non authentifiÃ©' });

      await immeubleService.delete(parseInt(req.params.id as string), req.user.users_id);
      res.json({ success: true, message: 'SupprimÃ©' });
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  }
}

export const immeubleController = new ImmeubleController();

