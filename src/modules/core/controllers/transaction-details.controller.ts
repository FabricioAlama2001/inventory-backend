// import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
// import { ResponseHttpModel } from "@shared/models";


// @Controller('transaction-details')
// export class TransactionDetailsController {
//         constructor(private readonly transactionDetailsService:TransactionDetailsService){

//         }   

//         @Post()
//         async create(@Body()payload: any): Promise<ResponseHttpModel> {
//             const data = await this.transactionDetailsService.create(payload);

//             return {
//                 data,
//                 message:'Registro creado',
//                 title:'',
//             } 
//         }

//         @Put(':id')
//         async update(@Param('id') id:string,@Body()payload: any): Promise<ResponseHttpModel> {
//             const data = await this.transactionDetailsService.update(id, payload);

//             return {
//                 data,
//                 message:'Detalle de Transacción actualizado',
//                 title:'',
//             } 
//         }

//         @Delete(':id')
//         @HttpCode(HttpStatus.CREATED)
//         async remove(@Param('id', ParseUUIDPipe) id: string) :Promise<ResponseHttpModel> {
//         const data = await this.transactionDetailsService.remove(id);

//         return {
//             data,
//             message: `Detail Transaction deleted ${id}`,
//             title: `Deleted`,
//         };
//         }
                      
//         @Get()
//         @HttpCode(HttpStatus.OK)
//         async findAll() :Promise<ResponseHttpModel> {
//             const response = await this.transactionDetailsService.findAll();
            
//             return {
//                 data: response,
//                 message: `index`,
//                 title: ``,
//             };
//         }
    
//         @Get(':id')
//         @HttpCode(HttpStatus.OK)
//         async findOne(@Param('id', ParseUUIDPipe) id: string) :Promise<ResponseHttpModel> {
//             const data = await this.transactionDetailsService.findOne(id);
            
//             return {
//                 data,
//                 message: `show ${id}`,
//                 title: `Success`,
//             };
//         }


// }