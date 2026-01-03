import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(fullname: string, email: string, pass: string) {
    const hashedPassword = await bcrypt.hash(pass, 10);
    try {
      const user = this.userRepository.create({ fullname, email, password: hashedPassword });
      await this.userRepository.save(user);
      return { message: 'User created successfully' };
    } catch (error) {
      throw new ConflictException('User already exists');
    }
  }

  async login(email: string, pass: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const payload = { email: user.email, sub: user.id };
      return { access_token: this.jwtService.sign(payload) };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}