import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { SignInDto } from '../dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async signin(@Body() signInDto: SignInDto) {
    try {
      const res = await this.authService.signin(
        signInDto.username,
        signInDto.password,
      );
      return res;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
