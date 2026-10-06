import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import { usersController } from '../controllers/users.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

interface UserRequest extends Request {
  file?: Express.Multer.File;
}

// Middleware d'authentification pour toutes les routes users
router.use(authMiddleware);

// Routes
router.get('/', (req, res) => usersController.getAllUsers(req, res));
router.get('/:id', (req, res) => usersController.getUserById(req, res));
router.post('/', (req, res) => usersController.createUser(req, res));
router.put('/:id', (req, res) => usersController.updateUser(req, res));
router.delete('/:id', (req, res) => usersController.deleteUser(req, res));

// POST /api/v1/users/:id/photo - Upload photo
router.post('/:id/photo', upload.single('file'), (req: UserRequest, res: Response) =>
  usersController.uploadPhoto(req, res)
);

// POST /api/v1/users/:id/signature - Upload signature
router.post('/:id/signature', upload.single('file'), (req: UserRequest, res: Response) =>
  usersController.uploadSignature(req, res)
);

export default router;
