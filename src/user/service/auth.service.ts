import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signin(username: string, password: string) {
    const userSign = await this.findUserByUsername(username);
    if (!userSign) {
      throw new UnauthorizedException('User Not Found');
    }

    const isValidPassword = await bcrypt.compare(password, userSign.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      sub: userSign.id,
      username: userSign.username,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    return { accessToken, payload };
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username });
  }
}
