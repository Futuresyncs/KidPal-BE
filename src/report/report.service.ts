import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto ,UpdateReportDto} from './dto/create-report-dto';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class ReportService {
  private prisma = new PrismaClient();

  async endSession(sessionData: { time: number; date: string; image: string; description: string }) {
    const { time, date, image, description } = sessionData;

    // Save the session to the database
    await this.prisma.report.create({
      data: {
        time,
        date: new Date(date),
        image,
        description,
      }, 
    });

    // Calculate total usage for the given date
    const totalUsage = await this.prisma.report.aggregate({
      _sum: {
        time: true,
      },
      where: {
        date: {
          gte: new Date(date),
          lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000), // Same day
        },
      },
    });

    const totalTime = totalUsage._sum.time || 0;
    const totalHours = (totalTime / 3600).toFixed(2);

    // Return the session details along with total usage
    return {
      image,
      description,
      totalHours: `${totalHours} hours`,
    };
  }
}
