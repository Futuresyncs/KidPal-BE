import { Body, Controller, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report-dto';
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post() // POST /users
  create(
    @Body()
    report: CreateReportDto,
  ) {
    return this.reportService.create(report);
  }
}
