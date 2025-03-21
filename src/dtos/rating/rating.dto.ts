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

class UserShortDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    profilePic : string
}
class likerDetails{
    @IsString()
    @IsOptional()
    id:string;
    @IsBoolean()
    @IsOptional()
    isliked:boolean;
    @IsBoolean()
    @IsOptional()
    isDeleted: boolean;
    @IsBoolean()
    @IsOptional()     // Set and updated by user
    isHidden: boolean;
    @IsBoolean()
    @IsOptional()
    isdisliked:boolean;
}



export class UpdateRatingDto {
    @IsString()
    @IsOptional()
    productId?: string;

    @IsObject()
    @IsOptional()
    userDetails?: UserShortDto;

    @IsNumber()
    @IsOptional()
    rating?: number;

    @IsString()
    @IsOptional()
    review?: string;

    @IsNumber()
    @IsOptional()
    likes?: number;

    @IsNumber()
    @IsOptional()
    dislikes?: number;
    @IsArray()
    @IsOptional()
    likerDetails:likerDetails[];
    @IsString()
    @IsOptional()
    imageUrl: string;

    @IsString()
    @IsOptional()
    eventId:string;

    @IsNotEmpty()
    @IsOptional()
    reviewType:string
}
