import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsString,
    ValidateNested,
    IsDate,
    IsArray,
    IsOptional,
    isBoolean,
} from 'class-validator';


export class FaqDto {
    @IsString()
    @IsNotEmpty()
    question: string;
    
    @IsString()
    @IsNotEmpty()
    answer: string;
   }