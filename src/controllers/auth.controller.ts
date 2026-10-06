import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export class AuthController {
  async loginWithPin(req: Request, res: Response) {
    try {
      const { pin } = req.body;

      if (!pin || pin.length !== 4) {
        return res.status(400).json({
          success: false,
          error: 'PIN must be 4 digits',
        });
      }

      const result = await authService.loginWithPinOnly(pin);

      if (!result) {
        return res.status(401).json({
          success: false,
          error: 'Invalid PIN',
        });
      }

      return res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('[Auth] Login error:', error);
      return res.status(500).json({
        success: false,
        error: 'Login failed',
      });
    }
  }
}

export const authController = new AuthController();
