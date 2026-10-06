import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { JWTPayload } from '../types/jwt.types';

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Token manquant',
      code: 'MISSING_TOKEN',
    });
  }

  const payload = authService.verifyToken(token);
  if (!payload) {
    return res.status(401).json({
      success: false,
      error: 'Token invalide ou expirÃ©',
      code: 'INVALID_TOKEN',
    });
  }

  req.user = payload;
  next();
};

/**
 * Middleware pour vÃ©rifier un rÃ´le spÃ©cifique
 */
export const requireRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.users_role)) {
      return res.status(403).json({
        success: false,
        error: 'Permission insuffisante',
        code: 'FORBIDDEN',
      });
    }
    next();
  };
};



