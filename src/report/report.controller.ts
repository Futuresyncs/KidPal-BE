import { Body, Controller, Delete, Get, Param, Patch, Post,ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto,UpdateReportDto } from './dto/create-report-dto';
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('endSession')
  async endSession(@Body() body: any) {
    const { time, date, description, image } = body;

    // Pass data to the service for processing
    return this.reportService.endSession({
      time: parseInt(time, 10),
      date,
      image,
      description,
    });
  }
  

}
