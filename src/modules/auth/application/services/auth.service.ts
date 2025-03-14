import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterBusinessDto } from '../dto/registerBusiness.dto';
import { AddressRepository } from '../../infrastructure/repositories/address.repository';
import { Address } from '../../domain/entities/address.entity';
import { BusinessRepository } from '../../infrastructure/repositories/business.repository';
import { LoginBusinessDto } from '../dto/loginBusiness.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly businessRepository: BusinessRepository,
    private readonly addressRepository: AddressRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async register(_data: RegisterDto): Promise<{ message: string }> {
    const newUser = RegisterDto.toDomain(_data);
    await newUser.setSenha(
      _data.senha,
      (this.configService.get<string>('KEY_PASSWORD') as string) || 'secret',
    );
    await this.userRepository.create(newUser);
    return { message: 'User created' };
  }
  async login(_data: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByEmail(_data.email);
    if (!user) {
      throw new Error('User not found');
    }
    let isPasswordValid: boolean;
    try {
      isPasswordValid = await bcrypt.compare(_data.senha, user.senha);
    } catch (error) {
      console.log(error);
      throw new Error('Error comparing passwords');
    }
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    } else {
      const payload = { sub: user.idCliente, username: user.nome };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }

  async registerBusiness(
    _data: RegisterBusinessDto,
  ): Promise<{ message: string }> {
    const newBusi = RegisterBusinessDto.toDomain(_data);
    await newBusi.setSenha(
      _data.senha,
      (this.configService.get<string>('KEY_PASSWORD') as string) || 'secret',
    );
    const addr: Address = await this.addressRepository.create(newBusi.endereco);
    newBusi.setEndereco(addr);
    await this.businessRepository.create(newBusi);
    return { message: 'User created' };
  }
  async loginBusiness(
    _data: LoginBusinessDto,
  ): Promise<{ access_token: string }> {
    const user = await this.businessRepository.findByEmail(_data.email);
    if (!user) {
      throw new Error('User not found');
    }
    let isPasswordValid: boolean;
    try {
      isPasswordValid = await bcrypt.compare(_data.senha, user.senha);
    } catch (error) {
      console.log(error);
      throw new Error('Error comparing passwords');
    }
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    } else {
      const payload = { sub: user.idEmpresa, username: user.nome };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }
}
