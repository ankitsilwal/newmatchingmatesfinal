import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Body() dto: any) {
    try {
      const create = await this.userService.createUser(dto);
      return create; // Ensure this returns the created user object
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    try {
      const user = await this.userService.getById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error('Error in controller:', error);
      throw new BadRequestException('Failed to fetch user');
    }
  }
}
