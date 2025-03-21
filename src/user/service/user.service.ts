import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(dto: any) {
    try {
      const { name, username, password, email } = dto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const userWithId = {
        name,
        username,
        password: hashedPassword,
        email,
        id: uuid(),
      };
      const userCreation = await this.userModel.create(userWithId);
      return userCreation;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new BadRequestException('Failed to create user');
    }
  }

  async getById(id: string): Promise<User | null> {
    try {
      const getUser = await this.userModel
        .findOne({ id: id }, { password: 0, _id: 0, __v: 0 })
        .exec();
      return getUser;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new BadRequestException('Failed to fetch user');
    }
  }
}
