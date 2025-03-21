import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Unique username' })
  username: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name' })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Valid email' })
  email: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'Password' })
  password: string;
}
