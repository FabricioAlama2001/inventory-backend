import { UserEntity } from '@auth/entities';
import { CategoryEntity, ExpenseEntity, IncomeEntity, ProductEntity, SignatureEntity, TransactionInDetailEntity, TransactionOutDetailEntity } from '@core/entities';
import { Inject, Injectable, NotFoundException, Res } from '@nestjs/common';
import { CoreRepositoryEnum } from '@shared/enums';
import { format } from 'date-fns';
import { string } from 'joi';
import { Between, Repository, SelectQueryBuilder, Transaction } from 'typeorm';
const { PDFDocument } = require('pdfkit-table-ts');

@Injectable()
export class ReportsService {

    constructor(
        @Inject(CoreRepositoryEnum.CATEGORY_REPOSITORY) private readonly categoryRepository: Repository<CategoryEntity>) {
    }

    async generatePdf(@Res() res: Response): Promise<Buffer> {

        const transactions = await this.findTransactionsByDates(new Date('2024-04-01'), new Date('2024-04-31'));


        const doc = new PDFDocument({
            size: 'A4',
            bufferPages: true,
            align: 'center',
            layout: 'landscape'
        });
        doc.pipe(res);

        const tittle1 = 'CONSERVATORIO NACIONAL DE MÚSICA';
        const tittle2 = 'REPORTE CONTABLE';
        const tittle3 = 'FECHA';

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
        doc.text(tittle3, (doc.page.width - textWidth3) / 2, 50);

        const rows = transactions.map(transaction => {
            return [
                transaction.category,
                transaction.product_code,
                transaction.product,
                transaction.incomes,
                transaction.expenses,
                transaction.stock
            ];
        })
        console.log(transactions);
        const table = {
            headers: ["CATEGORÍA", "CÓDIGO", "NOMBRE", "INGRESO", "EGRESO", "CANTIDAD TOTAL"],
            rows
        };

        const options = {
            width: 800,
            x: (doc.page.width - 800) / 2, // Calcula el centro horizontal restando el ancho de la tabla del ancho de la página y dividiendo por 2
            y: 100,
            padding: { top: 10, bottom: 10, left: 10, right: 10 }
        };

        await doc.table(table, options);

        doc.end();

        return;
    }

    async generatePdfIncome(@Res() res: Response, incomeId: string): Promise<Buffer> {
        console.log(incomeId);
        const incomes = await this.findIncome(incomeId);
        console.log(incomes);
        if (incomes.length === 0) {
            throw new NotFoundException('No se encontró');
        }

        const date = format(incomes[0].date, 'PPPP');

        const doc = new PDFDocument({
            size: 'A4',
            bufferPages: true,
            align: 'center',
            layout: 'landscape'
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
        })

        const table = {
            headers: ["CÓDIGO", "DESCRIPCIÓN", "CANTIDAD", " V.U.", "TOTAL"],
            rows
        };

        const options = {
            width: 800,
            x: (doc.page.width - 800) / 2, // Calcula el centro horizontal restando el ancho de la tabla del ancho de la página y dividiendo por 2
            y: 100,
            padding: { top: 10, bottom: 10, left: 10, right: 10 }
        };

        await doc.table(table, options);

        doc.end();

        return;
    }

    async generatePdfExpenses(@Res() res: Response): Promise<Buffer> {
        const doc = new PDFDocument({
            size: 'A4',
            bufferPages: true,
            align: 'center',
            layout: 'landscape'
        });

        doc.pipe(res);


        const tittle1 = 'CONSERVATORIO NACIONAL DE MÚSICA';
        const tittle2 = 'EGRESOS A BODEGA';
        const tittle3 = 'FECHA:';
        const tittle4 = 'CATEGORÍA';

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

        const table = {
            headers: ["CÓDIGO", "DESCRIPCIÓN", "CANTIDAD"],
            rows: [
                ["Valor 1", "Valor 2", "Valor 2"],
                ["Otro valor 1", "Otro valor 2", "Valor 2"]
            ]
        };
        const options = {
            width: 800,
            x: (doc.page.width - 800) / 2, // Calcula el centro horizontal restando el ancho de la tabla del ancho de la página y dividiendo por 2
            y: 100,
            padding: { top: 10, bottom: 10, left: 10, right: 10 }
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
            .where('incomes.date between :startedAt and :endedAt', { startedAt, endedAt })
            .groupBy('categories.name')
            .addGroupBy('products.name')
            .addGroupBy('products.stock')
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
            "users.name || ' ' || users.lastname as user",
            'transaction_in_details.quantity as quantity',
        ])
            .innerJoin(ProductEntity, 'products', 'products.category_id = categories.id')
            .leftJoin(TransactionInDetailEntity, 'transaction_in_details', 'transaction_in_details.product_id = products.id')
            .leftJoin(IncomeEntity, 'incomes', 'incomes.id = transaction_in_details.income_id')
            .leftJoin(SignatureEntity, 'signatures', 'signatures.income_id = incomes.id')
            .leftJoin(UserEntity, 'users', 'users.id = signatures.receiver')
            .where('incomes.id = :incomeId and transaction_in_details.deleted_at is null', { incomeId })


        return queryBuilder.getRawMany();
    }

    private async findExpense(expenseId: string) {

        const queryBuilder: SelectQueryBuilder<CategoryEntity> = this.categoryRepository.createQueryBuilder('categories');

        queryBuilder.select([
            'categories.name as category',
            'products.code as product_code',
            'products.name as product',
            'transaction_out_details.quantity as quantity',
        ])
            .innerJoin(ProductEntity, 'products', 'products.category_id = categories.id')
            .leftJoin(TransactionOutDetailEntity, 'transaction_out_details', 'transaction_out_details.product_id = products.id')
            .leftJoin(IncomeEntity, 'incomes', 'incomes.id = transaction_out_details.income_id')
            .where('expenses.id = :id', { expenseId })
            .where('transaction_out_details.deleted_at is null')

        return queryBuilder.getRawMany();
    }
}