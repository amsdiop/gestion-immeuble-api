import jwt from 'jsonwebtoken';
import { User, UserRole } from '../entities/User.entity';
import { JWTPayload } from '../types/jwt.types';
import { AppDataSource } from '../database/data-source';

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);

  generateToken(payload: JWTPayload, expiresIn?: string): string {
    const secret = process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production_12345';
    const exp = expiresIn || process.env.JWT_EXPIRATION || '7d';
    return jwt.sign(payload, secret, { expiresIn: exp } as any);
  }

  generateRefreshToken(payload: JWTPayload): string {
    const secret = process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production_12345';
    const exp = process.env.JWT_REFRESH_EXPIRATION || '30d';
    return jwt.sign(payload, secret, { expiresIn: exp } as any);
  }

  verifyToken(token: string): JWTPayload | null {
    try {
      const secret = process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production_12345';
      return jwt.verify(token, secret) as unknown as JWTPayload;
    } catch (error) {
      return null;
    }
  }

  async loginWithPinOnly(pin: string): Promise<{
    token: string;
    refresh_token: string;
    user: any;
  } | null> {
    try {
      const user = await this.userRepo.findOne({ where: { users_pin: pin, users_actif: 1 } });

      if (!user) {
        return null;
      }

      const payload: JWTPayload = {
        sub: user.users_id,
        users_id: user.users_id,
        users_email: user.users_email,
        users_role: user.users_role,
      };

      const token = this.generateToken(payload);
      const refresh_token = this.generateRefreshToken(payload);

      return {
        token,
        refresh_token,
        user: {
          id: user.users_id,
          email: user.users_email,
          nom: user.users_nom,
          prenom: user.users_prenom,
          role: user.users_role,
        },
      };
    } catch (error) {
      console.error('[Auth] LoginWithPinOnly error:', error);
      throw error;
    }
  }

  async checkEmailAvailable(email: string): Promise<boolean> {
    try {
      const user = await this.userRepo.findOne({ where: { users_email: email } });
      return !user;
    } catch (error) {
      console.error('[Auth] CheckEmailAvailable error:', error);
      throw error;
    }
  }

  async getCurrentUser(users_id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { users_id } });
  }
}

export const authService = new AuthService();
