import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Query, Res } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { ResponseHttpModel } from '@shared/models';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService) {
  }

  @Get('incomes/:id')
  @HttpCode(HttpStatus.OK)
  async generatePDFIncome(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    await this.reportsService.generatePdfIncome(res, id);

    return {
      data: null,
      message: ` Income Report`,
      title: `Report Income`,
    };
  }

  @Get('expenses/:id')
  @HttpCode(HttpStatus.OK)
  async generatePDFExpenses(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpModel> {
    await this.reportsService.generatePdfExpenses(res, id);

    return {
      data: null,
      message: `Expenses Report`,
      title: `Report Expenses`,
    };
  }

  @Get('transactions')
  @HttpCode(HttpStatus.OK)
  async generatePDFTransactions(@Res() res: Response, @Query() params: any): Promise<ResponseHttpModel> {
    await this.reportsService.generatePdfTransactionsByDates(res, params);

    return {
      data: null,
      message: `Expenses Report`,
      title: `Report Expenses`,
    };
  }
}