import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

interface SignInDto {
  username: string;
  password: string;
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
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
