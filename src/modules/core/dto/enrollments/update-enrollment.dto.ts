import {PartialType} from '@nestjs/mapped-types';
import {IsDate, IsOptional, IsString} from "class-validator";
import {CreateEnrollmentDto} from '@core/dto';

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {
    @IsOptional()
    @IsDate({message: 'El campo date debe ser una fecha'})
    readonly date: Date;

    @IsOptional()
    @IsString({message: 'El campo folio debe ser un string'})
    readonly folio: string;
}
