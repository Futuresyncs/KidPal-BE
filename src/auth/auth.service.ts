import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();
  constructor(private readonly jwtService: JwtService) {}
  async signup(name: string, email: string, password: string) {
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
      data: { name, email, password: hashedPassword },
    });

    const res = {
      name: user.name,
      email: user.email,
      token: this.generateToken(user.id, user.email).access_token,
    };

    return res;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid)
      throw new UnauthorizedException('Invalid email or password');

    const res = {
      name: user.name,
      email: user.email,
      token: this.generateToken(user.id, user.email).access_token,
    };

    return res;
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
          name: user.name,
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

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }

    const otp = this.generateOtp();
    await this.sendOtpEmail(email, otp);

    // Save OTP in database or cache for verification (e.g., Redis)
    await this.prisma.otp.create({
      data: { email, otp, expiresAt: new Date(Date.now() + 15 * 60 * 1000) }, // Expires in 15 minutes
    });

    return { message: 'OTP sent to your email address' };
  }
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  }

  private async sendOtpEmail(email: string, otp: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or any email service you use
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'no-reply@yourdomain.com',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is ${otp}. It is valid for 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);
  }
  async getUsers() {
    const users = await this.prisma.user.findMany({});
    return users;
  }
}
