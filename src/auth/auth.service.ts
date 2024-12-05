import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
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
    if (!passwordValid)
      throw new UnauthorizedException('Invalid email or password');

    return this.generateToken(user.id, user.email);
  }

  async googleLogin(user: any) {
    console.log(user);
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      // Create a new user if not already in the database
      const newUser = await this.prisma.user.create({
        data: {
          email: user.email,
          password: '',
        },
      });

      const message = `${user.firstName} successfully added in db`;

      return this.generateToken(newUser.id, newUser.email, message);
    }

    // If the user exists, generate a token
    return this.generateToken(existingUser.id, existingUser.email);
  }

  private generateToken(userId: number, email: string, message?: string) {
    const payload = { userId, email };
    return {
      access_token: this.jwtService.sign(payload),
      message,
    };
  }

  async getUsers(){
    const users = await this.prisma.user.findMany({})
    return users
  }
  
}
