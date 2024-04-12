import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Res } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { ResponseHttpModel } from '@shared/models';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService) {
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async generateEnrollmentCertificate(@Res() res: Response): Promise<ResponseHttpModel> {
    await this.reportsService.generatePdf(res);

    return {
      data: null,
      message: `Enrollment Certificate`,
      title: `Report`,
    };

  }

  @Get('incomes/:id')
  @HttpCode(HttpStatus.OK)
  async generetePDFIncome(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    await this.reportsService.generatePdfIncome(res, id);

    return {
      data: null,
      message: ` Income Report`,
      title: `Report Income`,
    };
  }

  @Get('expenses/:id')
  @HttpCode(HttpStatus.OK)
  async generetePDFExpenses(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    await this.reportsService.generatePdfExpenses(res, id);

    return {
      data: null,
      message: `Expenses Report`,
      title: `Report Expenses`,
    };
  }
}