import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Username for authentication',
  })
  username: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'User password' })
  password: string;
}
