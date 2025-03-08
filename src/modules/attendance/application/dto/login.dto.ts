import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from '../../domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'example1@mail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password is too short',
  })
  senha: string;

  static toDomain(dto: LoginDto): User {
    return new User(0, '', '', dto.email, '', dto.senha);
  }
}
