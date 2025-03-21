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
    const userSign = await this.findUserByusername(username);
    if (!userSign) {
      throw new UnauthorizedException('User Not Found');
    }

    const Validpassword = await bcrypt.compare(password, userSign.password);
    if (!Validpassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      sub: userSign.id,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { accessToken, payload };
  }

  async findUserByusername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username });
  }
}
