import express, { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

router.post('/login-pin', (req, res) => authController.loginWithPin(req, res));
router.post('/login-pin-only', (req, res) => authController.loginWithPin(req, res));

export default router;
