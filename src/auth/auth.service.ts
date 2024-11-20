import { Injectable, UnauthorizedException ,HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();

  constructor(private readonly jwtService: JwtService) {}

  async signup(email: string, password: string) {
    // Check if the email already exists in the database
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
  
    if (existingUser) {
      // Throw a 400 Bad Request exception with a custom error message
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create the new user
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword },
    });
  
    // Generate and return the token
    return this.generateToken(user.id, user.email);
  }
  

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Invalid email or password');

    return this.generateToken(user.id, user.email);
  }

  private generateToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
