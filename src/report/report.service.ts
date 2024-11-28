import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto ,UpdateReportDto} from './dto/create-report-dto';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class ReportService {
  private prisma = new PrismaClient();

  async create(report: CreateReportDto) {
    // Validate if the provided child_id exists
    const child = await this.prisma.child_Profile.findUnique({
      where: { id: report.child_id },
    });
  
    if (!child) {
      throw new NotFoundException(`Child with ID ${report.child_id} does not exist`);
    }
  
    // Proceed to create the report
    const newReport = await this.prisma.report.create({
      data: {
        child_id: child.id, // Ensure you're referencing the correct `id`
        session_summary: report.session_summary,
        conversation_logs: JSON.parse(JSON.stringify(report.conversation_logs)),
        progress_data: JSON.parse(JSON.stringify(report.progress_data)),
      },
    });
  
    return {
      message: 'Report created successfully',
      report: newReport,
    };
  }
  

  async getAll() {
    const reports = await this.prisma.report.findMany();
    return reports;
  }

  async update(id: number, report: UpdateReportDto) {
    const updatedReport = await this.prisma.report.update({
      where: { id },
      data: {
        child_id: report.child_id,
        session_summary: report.session_summary,
        conversation_logs: report.conversation_logs
          ? JSON.parse(JSON.stringify(report.conversation_logs))
          : undefined,
        progress_data: report.progress_data
          ? JSON.parse(JSON.stringify(report.progress_data))
          : undefined,
      },
    });

    return {
      message: 'Report updated successfully',
      report: updatedReport,
    };
  }

  async delete(id: number) {
    try {
      await this.prisma.report.delete({
        where: { id },
      });
      return { message: 'Report deleted successfully' };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Report with ID ${id} not found`);
      }
      throw error; // Re-throw the error if it's not the expected one
    }
  }
}
