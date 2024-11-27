import { Body, Controller, Delete, Get, Param, Patch, Post,ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto,UpdateReportDto } from './dto/create-report-dto';
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post() // POST /users
  create(
    @Body(ValidationPipe)
    report: CreateReportDto,
  ) {
    return this.reportService.create(report);
  }

  
  @Get()
  getAll() {
    return this.reportService.getAll();
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe ) id: number, @Body(ValidationPipe) report: UpdateReportDto) {
    return this.reportService.update(id, report);
  }

  @Delete(':id')
  delete(@Param('id',ParseIntPipe) id: number) {
    return this.reportService.delete(id);
  }
}
