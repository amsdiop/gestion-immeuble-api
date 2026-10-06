import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User.entity';

export class UsersService {
  private userRepo = AppDataSource.getRepository(User);

  async getAllUsers(): Promise<User[]> {
    return this.userRepo.find({
      order: { users_created_at: 'DESC' },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { users_id: id } });
  }

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    await this.userRepo.update(id, data);
    return this.getUserById(id) as Promise<User>;
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await this.userRepo.delete(id);
    return (result.affected || 0) > 0;
  }

  async getUserByPin(pin: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { users_pin: pin } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { users_email: email } });
  }

  async uploadPhoto(id: number, buffer: Buffer): Promise<User> {
    await this.userRepo.update(id, { users_photo: buffer });
    const user = await this.getUserById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async uploadSignature(id: number, buffer: Buffer): Promise<User> {
    await this.userRepo.update(id, { users_signature: buffer });
    const user = await this.getUserById(id);
    if (!user) throw new Error('User not found');
    return user;
  }
}

export const usersService = new UsersService();
