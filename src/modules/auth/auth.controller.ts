import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { RegisterDto } from './application/dto/register.dto';
import { AuthService } from './application/services/auth.service';
import { LoginDto } from './application/dto/login.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterBusinessDto } from './application/dto/registerBusiness.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/client/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const token = await this.authService.login(loginDto);
      response.cookie('token', token.access_token, {
        maxAge: 1000 * 60,
      });
      return token;
    } catch (error) {
      if (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Post('/client/register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: { example: { message: 'User created' } },
    content: { 'application/json': { example: { message: 'User created' } } },
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
    schema: { example: { statusCode: 409, message: 'User already exists' } },
  })
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      if (error) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw error;
    }
  }

  @Post('/register')
  @ApiOperation({ summary: 'Business registration' })
  async registerBusiness(@Body() registerBusinessDto: RegisterBusinessDto) {
    return registerBusinessDto;
  }
}
