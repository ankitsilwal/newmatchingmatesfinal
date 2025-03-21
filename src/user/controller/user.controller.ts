import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RequestWithUser } from '../types/request-with-user.interface';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'Failed to create user' })
  async createUser(@Body() dto: CreateUserDto) {
    try {
      return await this.userService.createUser(dto);
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current authenticated user (Requires Bearer Token)',
  })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Missing or invalid token',
  })
  async getMe(@Req() req: RequestWithUser) {
    const userId = req.user.sub;

    if (!userId) {
      throw new NotFoundException('Invalid token payload');
    }

    const user = await this.userService.getById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }
}
