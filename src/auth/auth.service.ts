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

    // Check if any entry in Child_Profile exists with parent_id matching the user.id
    const hasChildProfile = await this.prisma.child_Profile.findFirst({
      where: { parent_id: user.id },
    });

    const res = {
      isOldUser: !!hasChildProfile,
      childId: hasChildProfile ? hasChildProfile.id : null,
      id: user.id,
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
    // Check if any entry in Child_Profile exists with parent_id matching the user.id
    const hasChildProfile = await this.prisma.child_Profile.findFirst({
      where: { parent_id: user.id },
    });
    const res = {
      isOldUser: !!hasChildProfile,
      childId: hasChildProfile ? hasChildProfile.id : null,
      id: user.id,
      name: user.name,
      email: user.email,
      token: this.generateToken(user.id, user.email).access_token,
    };

    return res;
  }

  async googleLogin(user: any) {
    debugger
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
      data: {
        userId: user.id,
        otp,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      }, // Expires in 15 minutes
    });

    return {
      message: 'OTP sent to your email address',
      OTPExpiresAt: '15 mins',
      userId: user.id,
      name: user.name,
      email,
    };
  }

  private generateOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
  }

  private async sendOtpEmail(email: string, otp: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or any email service you use
      auth: {
        user: 'nk104626@gmail.com',
        pass: 'prhu qazo clxl fmwy',
      },
    });

    const mailOptions = {
      from: 'nk104626@gmail.com',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is ${otp}. It is valid for 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);
  }


  async verifyOtp(userId: number, otp: string) {
    const otpRecord = await this.prisma.otp.findFirst({
      where: {
        userId,
        otp,
      },
    });
  
    if (!otpRecord) {
      throw new HttpException('OTP not found or expired', HttpStatus.NOT_FOUND);
    }
  
    const now = new Date();
     // Ensure the expiration check is consistent with UTC
  if (new Date(otpRecord.expiresAt).getTime() < now.getTime()) {
    throw new HttpException('OTP has expired', HttpStatus.BAD_REQUEST);
  }
  
    // OTP is valid - Delete it from the database (optional for security)
    await this.prisma.otp.deleteMany({ where: { userId } });
  
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    return {
      message: 'OTP verified successfully',
      token: this.generateToken(userId, user.email).access_token,
    };
  }
  

  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = this.jwtService.verify(token); // Decode the token
      const { userId, email } = decoded;

      // Ensure user exists
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user.id || user.email !== email) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      return { message: 'Password reset successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to reset password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({});
    return users;
  }
}
