import { Request, Response } from 'express';
import { usersService } from '../services/users.service';

export class UsersController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await usersService.getAllUsers();
      const usersData = users.map(user => {
        const userData = { ...user };
        if (userData.users_photo) {
          userData.users_photo = userData.users_photo.toString('base64') as any;
        }
        if (userData.users_signature) {
          userData.users_signature = userData.users_signature.toString('base64') as any;
        }
        return userData;
      });
      return res.json({
        success: true,
        data: { users: usersData },
      });
    } catch (error: any) {
      console.error('[UsersController] Error fetching users:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Error fetching users',
      });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id = typeof req.params.id === 'string' ? req.params.id : req.params.id[0];
      const user = await usersService.getUserById(parseInt(id));

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }

      const userWithData = {
        ...user,
        users_photo: user.users_photo ? user.users_photo.toString('base64') : null,
        users_signature: user.users_signature ? user.users_signature.toString('base64') : null,
      };

      return res.json({
        success: true,
        data: userWithData,
      });
    } catch (error: any) {
      console.error('[UsersController] Error fetching user:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Error fetching user',
      });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const data = req.body;
      const user = await usersService.createUser(data);
      return res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      console.error('[UsersController] Error creating user:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Error creating user',
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = typeof req.params.id === 'string' ? req.params.id : req.params.id[0];
      const data = req.body;
      const user = await usersService.updateUser(parseInt(id), data);
      return res.json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      console.error('[UsersController] Error updating user:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Error updating user',
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = typeof req.params.id === 'string' ? req.params.id : req.params.id[0];
      const deleted = await usersService.deleteUser(parseInt(id));

      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }

      return res.json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error: any) {
      console.error('[UsersController] Error deleting user:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Error deleting user',
      });
    }
  }

  async uploadPhoto(req: Request & { file?: Express.Multer.File }, res: Response) {
    try {
      const id = typeof req.params.id === 'string' ? req.params.id : req.params.id[0];

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No file provided',
        });
      }

      const user = await usersService.uploadPhoto(parseInt(id), req.file.buffer);
      return res.json({
        success: true,
        message: 'Photo uploaded successfully',
        data: {
          users_id: user.users_id,
          uploaded_at: new Date(),
        },
      });
    } catch (error: any) {
      console.error('[UsersController] Error uploading photo:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Error uploading photo',
      });
    }
  }

  async uploadSignature(req: Request & { file?: Express.Multer.File }, res: Response) {
    try {
      const id = typeof req.params.id === 'string' ? req.params.id : req.params.id[0];

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No file provided',
        });
      }

      const user = await usersService.uploadSignature(parseInt(id), req.file.buffer);
      return res.json({
        success: true,
        message: 'Signature uploaded successfully',
        data: {
          users_id: user.users_id,
          uploaded_at: new Date(),
        },
      });
    } catch (error: any) {
      console.error('[UsersController] Error uploading signature:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Error uploading signature',
      });
    }
  }
}

export const usersController = new UsersController();
