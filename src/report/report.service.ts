import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report-dto';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async create(report: CreateReportDto) {
    const newReport = await this.prisma.report.create({
      data: {
        child_id: report.child_id,
        session_summary: report.session_summary,
        // Convert class instances to plain JSON objects
        conversation_logs: JSON.parse(JSON.stringify(report.conversation_logs)),
        progress_data: JSON.parse(JSON.stringify(report.progress_data)),
        createdAt: new Date(),
      },
    });

    return {
      message: 'Report created successfully',
      report: newReport,
    };
  }
}
