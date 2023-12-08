import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }

  async delete(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: string, user: User): Promise<User> {
    const existingEntity = await this.userModel.findById(id);

    if (!existingEntity) {
      throw new NotFoundException('User not found');
    }

    existingEntity.set(user);
    return existingEntity.save();
  }
}
