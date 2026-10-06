import { UserRole } from '../entities/User.entity';

export interface JWTPayload {
  sub: number;
  users_id: number;
  users_email: string;
  users_role: UserRole;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    refresh_token: string;
    user: {
      id: number;
      email: string;
      nom: string;
      role: UserRole;
    };
  };
  error?: string;
  code?: string;
}

export interface LoginPinRequest {
  email: string;
  pin: string;
}

export interface LoginPasswordRequest {
  email: string;
  mot_de_passe: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}
