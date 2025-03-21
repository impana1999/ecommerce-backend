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
} from 'class-validator';



export class tournamentDto {
    @IsString()
    @IsNotEmpty()
    description : string 

    @IsString()
    @IsNotEmpty()
    imageUrl  : string

    @IsString()
    @IsNotEmpty()
    title : string 
    @IsNumber()
    @IsNotEmpty()
    totalEntries : number
    @IsNumber()
    @IsNotEmpty()
    date : number
    @IsNumber()
    @IsNotEmpty()
    time : number
    @IsNumber()
    @IsNotEmpty()
    totalAmount : number
}
