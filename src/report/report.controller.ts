import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  // ParseIntPipe,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { EndSessionDto } from './dto/create-report-dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('endSession')
  async endSession(@Body(ValidationPipe) body: EndSessionDto, @Req() req: any) {
    const { time, date, description, image, name } = body;
    const { userId } = req.user;
    // Pass data to the service for processing
    return this.reportService.endSession({
      time: time,
      date,
      image,
      description,
      name,
      userId
    });
  }

 @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllReports(@Req() req: any) {
    const { userId } = req.user; // Get the user from the token
    return this.reportService.getAllReports(userId);
  }

  @Get('byDate/:date')
  async getReportsByDate(@Param('date') date: string) {
    return this.reportService.getReportsByDate(date);
  }
}
