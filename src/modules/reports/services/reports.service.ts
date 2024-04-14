import { UserEntity } from '@auth/entities';
import {
  CategoryEntity,
  ExpenseEntity,
  IncomeEntity,
  ProductEntity,
  SignatureEntity,
  TransactionInDetailEntity,
  TransactionOutDetailEntity,
} from '@core/entities';
import { Inject, Injectable, NotFoundException, Res } from '@nestjs/common';
import { CoreRepositoryEnum } from '@shared/enums';
import { format } from 'date-fns';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { es } from 'date-fns/locale';

const { PDFDocument } = require('pdfkit-table-ts');

@Injectable()
export class ReportsService {

  constructor(
    @Inject(CoreRepositoryEnum.CATEGORY_REPOSITORY) private readonly categoryRepository: Repository<CategoryEntity>) {
  }

  async generatePdfTransactionsByDates(@Res() res: Response, params: any): Promise<Buffer> {
    console.log(params.startedAt.slice(1, -15));
    console.log(params.endedAt.slice(1, -15));
    const startedAt = new Date(params.startedAt);
    const endedAt = new Date(params.endedAt);

    const transactions = await this.findTransactionsByDates(startedAt, endedAt);

    const doc = new PDFDocument({
      size: 'A4',
      bufferPages: true,
      align: 'center',
      layout: 'landscape',
    });
    doc.pipe(res);

    const tittle1 = 'CONSERVATORIO NACIONAL DE MÚSICA';
    const tittle2 = 'REPORTE CONTABLE';
    const tittle3 = `FECHA: desde ${format(startedAt, 'PPPP', { locale: es })} hasta ${format(endedAt, 'PPPP', { locale: es })}`;

    const textWidth1 = doc.widthOfString(tittle1);
    const textWidth2 = doc.widthOfString(tittle2);
    const textWidth3 = doc.widthOfString(tittle3);

    doc.font('Times-Roman');
    doc.fontSize(12);
    doc.text(tittle1, (doc.page.width - textWidth1) / 2, 10);

    doc.font('Times-Bold');
    doc.fontSize(12);
    doc.text(tittle2, (doc.page.width - textWidth2) / 2, 30);

    doc.font('Times-Italic');
    doc.fontSize(10);
    doc.text(tittle3, 20, 50);

    const rows = transactions.map(transaction => {
      return [
        transaction.category,
        transaction.product_code,
        transaction.product,
        transaction.incomes,
        transaction.expenses,
        transaction.stock,
      ];
    });

    const table = {
      headers: ['CATEGORÍA', 'CÓDIGO', 'PRODUCTO', 'INGRESOS', 'EGRESOS', 'CANTIDAD TOTAL'],
      rows,
    };

    const options = {
      width: 800,
      x: (doc.page.width - 800) / 2, // Calcula el centro horizontal restando el ancho de la tabla del ancho de la página y dividiendo por 2
      padding: { top: 10, bottom: 10, left: 10, right: 10 },
    };

    await doc.table(table, options);

    doc.end();

    return;
  }

  async generatePdfIncome(@Res() res: Response, incomeId: string): Promise<Buffer> {
    const incomes = await this.findIncome(incomeId);

    if (incomes.length === 0) {
      throw new NotFoundException('No se encontró');
    }

    const date = format(incomes[0].date, 'PPPP', { locale: es });

    const doc = new PDFDocument({
      size: 'A4',
      bufferPages: true,
      align: 'center',
      layout: 'landscape',
    });

    doc.pipe(res);

    const tittle1 = 'CONSERVATORIO NACIONAL DE MÚSICA';
    const tittle2 = 'INGRESO DE BODEGA';
    const tittle3 = `FECHA: ${date}`;
    const tittle4 = `ACTA ENTREGA Y RECEPCIÓN: ${incomes[0].user}`;

    const textWidth1 = doc.widthOfString(tittle1);
    const textWidth2 = doc.widthOfString(tittle2);
    const textWidth3 = doc.widthOfString(tittle3);
    const textWidth4 = doc.widthOfString(tittle4);

    doc.font('Times-Roman');
    doc.fontSize(12);
    doc.text(tittle1, (doc.page.width - textWidth1) / 2, 10);

    doc.font('Times-Bold');
    doc.fontSize(12);
    doc.text(tittle2, (doc.page.width - textWidth2) / 2, 30);

    doc.font('Times-Bold');
    doc.fontSize(10);
    doc.text(tittle3, (doc.page.width - textWidth3) / 20, 50);

    doc.font('Times-Bold');
    doc.fontSize(10);
    doc.text(tittle4, (doc.page.width - textWidth3) / 20, 70);

    const rows = incomes.map(incomes => {
      return [
        incomes.category,
        incomes.product_code,
        incomes.product,
        incomes.quantity,

      ];
    });

    const table = {
      headers: ['CATEGORÍA', 'CÓDIGO', 'DESCRIPCIÓN', 'CANTIDAD'],
      rows,
    };

    const options = {
      width: 800,
      x: (doc.page.width - 800) / 2, // Calcula el centro horizontal restando el ancho de la tabla del ancho de la página y dividiendo por 2
      y: 100,
      padding: { top: 10, bottom: 10, left: 10, right: 10 },
    };

    await doc.table(table, options);

    doc.end();

    return;
  }

  async generatePdfExpenses(@Res() res: Response, expenseId: string): Promise<Buffer> {
    const expenses = await this.findExpense(expenseId);

    if (expenses.length === 0) {
      throw new NotFoundException('No se encontró');
    }

    const date = format(expenses[0].date, 'PPPP', { locale: es });

    const doc = new PDFDocument({
      size: 'A4',
      bufferPages: true,
      align: 'center',
      layout: 'landscape',
    });

    doc.pipe(res);

    const tittle1 = 'CONSERVATORIO NACIONAL DE MÚSICA';
    const tittle2 = 'EGRESOS A BODEGA';
    const tittle3 = `FECHA: ${date}`;
    const tittle4 = `ACTA ENTREGA Y RECEPCIÓN: ${expenses[0].user}`;

    const textWidth1 = doc.widthOfString(tittle1);
    const textWidth2 = doc.widthOfString(tittle2);
    const textWidth3 = doc.widthOfString(tittle3);
    doc.font('Times-Roman');
    doc.fontSize(12);
    doc.text(tittle1, (doc.page.width - textWidth1) / 2, 10);

    doc.font('Times-Bold');
    doc.fontSize(12);
    doc.text(tittle2, (doc.page.width - textWidth2) / 2, 30);


    doc.font('Times-Bold');
    doc.fontSize(10);
    doc.text(tittle3, (doc.page.width - textWidth3) / 20, 50);

    doc.font('Times-Bold');
    doc.fontSize(10);
    doc.text(tittle4, (doc.page.width - textWidth3) / 20, 70);

    const rows = expenses.map(expense => {
      return [
        expense.category,
        expense.product_code,
        expense.product,
        expense.quantity,
      ];
    });

    const table = {
      headers: ['CATEGORÍA', 'CÓDIGO', 'DESCRIPCIÓN', 'CANTIDAD'],
      rows,
    };
    const options = {
      width: 800,
      x: (doc.page.width - 800) / 2, // Calcula el centro horizontal restando el ancho de la tabla del ancho de la página y dividiendo por 2
      y: 100,
      padding: { top: 10, bottom: 10, left: 10, right: 10 },
    };

    await doc.table(table, options);

    doc.end();

    return;
  }

  private async findTransactionsByDates(startedAt: Date, endedAt: Date) {
    const queryBuilder: SelectQueryBuilder<CategoryEntity> = this.categoryRepository.createQueryBuilder('categories');

    queryBuilder.select([
      'categories.name as category',
      'products.code as product_code',
      'products.name as product',
      'sum(transaction_in_details.quantity) as incomes',
      'sum(transaction_out_details.quantity) as expenses',
      'sum(transaction_in_details.quantity) - sum(transaction_out_details.quantity) as stock',
    ])
      .innerJoin(ProductEntity, 'products', 'products.category_id = categories.id')
      .leftJoin(TransactionInDetailEntity, 'transaction_in_details', 'transaction_in_details.product_id = products.id')
      .leftJoin(TransactionOutDetailEntity, 'transaction_out_details', 'transaction_out_details.product_id = products.id')
      .leftJoin(IncomeEntity, 'incomes', 'incomes.id = transaction_in_details.income_id')
      .leftJoin(ExpenseEntity, 'expenses', 'expenses.id = transaction_out_details.expense_id')
      .where('incomes.date between :startedAt and :endedAt or expenses.date between :startedAt and :endedAt', {
        startedAt,
        endedAt,
      })
      .groupBy('categories.name')
      .addGroupBy('products.name')
       .addGroupBy('products.code')
      .orderBy('categories.name')
      .addOrderBy('products.name');

    return queryBuilder.getRawMany();
  }

  private async findIncome(incomeId: string) {

    const queryBuilder: SelectQueryBuilder<CategoryEntity> = this.categoryRepository.createQueryBuilder('categories');

    queryBuilder.select([
      'categories.name as category',
      'products.code as product_code',
      'products.name as product',
      'incomes.date as date',
      'users.name || \' \' || users.lastname as user',
      'transaction_in_details.quantity as quantity',
    ])
      .innerJoin(ProductEntity, 'products', 'products.category_id = categories.id')
      .leftJoin(TransactionInDetailEntity, 'transaction_in_details', 'transaction_in_details.product_id = products.id')
      .leftJoin(IncomeEntity, 'incomes', 'incomes.id = transaction_in_details.income_id')
      .leftJoin(SignatureEntity, 'signatures', 'signatures.income_id = incomes.id')
      .leftJoin(UserEntity, 'users', 'users.id = signatures.receiver')
      .where('incomes.id = :incomeId and transaction_in_details.deleted_at is null', { incomeId });


    return queryBuilder.getRawMany();
  }

  private async findExpense(expenseId: string) {

    const queryBuilder: SelectQueryBuilder<CategoryEntity> = this.categoryRepository.createQueryBuilder('categories');

    queryBuilder.select([
      'categories.name as category',
      'products.code as product_code',
      'products.name as product',
      'expenses.date as date',
      'users.name || \' \' || users.lastname as user',
      'transaction_out_details.quantity as quantity',
    ])
      .innerJoin(ProductEntity, 'products', 'products.category_id = categories.id')
      .leftJoin(TransactionOutDetailEntity, 'transaction_out_details', 'transaction_out_details.product_id = products.id')
      .leftJoin(ExpenseEntity, 'expenses', 'expenses.id = transaction_out_details.expense_id')
      .leftJoin(SignatureEntity, 'signatures', 'signatures.expense_id = expenses.id')
      .leftJoin(UserEntity, 'users', 'users.id = signatures.receiver')
      .where('expenses.id = :expenseId and transaction_out_details.deleted_at is null', { expenseId });

    return queryBuilder.getRawMany();
  }
}