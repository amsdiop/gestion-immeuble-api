import { Router } from 'express';
import { immeubleController } from '../controllers/immeuble.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', (req, res) => immeubleController.getAll(req, res));
router.post('/', (req, res) => immeubleController.create(req, res));
router.get('/:id', (req, res) => immeubleController.getById(req, res));
router.put('/:id', (req, res) => immeubleController.update(req, res));
router.delete('/:id', (req, res) => immeubleController.delete(req, res));

export default router;
