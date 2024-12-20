import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateReportDto ,UpdateReportDto} from './dto/create-report-dto';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class ReportService {
  private prisma = new PrismaClient();

  async endSession(sessionData: {
    time: number;
    date: string;
    image: string;
    description: string;
    name: string;
    userId: number;
  }) {
    const { time, date, image, description, name, userId } = sessionData;

    // Save the session to the database
    await this.prisma.report.create({
      data: {
        time,
        date: new Date(date),
        image,
        description,
        name,
        userId,
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
      name,
      image,
      description,
      totalHours: `${totalHours} hours`,
    };
  }

  // Fetch all reports for a specific user
  async getAllReports(userId: number) {
    const reports = await this.prisma.report.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc', // Sort by createdAt in descending order
      },
    });

    if (reports.length === 0) {
      [];
    }

    return reports;
  }

  // Fetch reports for a specific date
  async getReportsByDate(date: string) {
    const startDate = new Date(date);
    const endDate = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000); // Next day

    const reports = await this.prisma.report.findMany({
      where: {
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: { date: 'desc' },
    });

    if (reports.length === 0) {
      throw new NotFoundException(`No reports found for date: ${date}`);
    }

    // Sum the total time for the date
    const totalTime = reports.reduce((acc, report) => acc + report.time, 0);
    const totalHours = (totalTime / 3600).toFixed(2);

    return {
      date,
      totalHours: `${totalHours} hours`,
      reports,
    };
  }
}
