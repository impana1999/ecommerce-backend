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

class EventDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    type: string;
}

class PackageDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

class BranchDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}

class UserShortDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}

class CelebrantDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    birthDate: string;

    @IsString()
    @IsNotEmpty()
    birthMonth: string;

    @IsString()
    @IsNotEmpty()
    birthYear: string;
}

class ServiceDto {
    @IsString()
    @IsOptional()
    _id: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    type: string;

    @IsString()
    @IsOptional()
    imageUrl: string;

    @IsString()
    @IsOptional()
    label:string;

    @IsString()
    @IsOptional()
    description:string;
    
    @IsString()
    @IsOptional()
    amount:string;
}
class RevuewDto {
    @IsString()
    @IsOptional()
    imageUrl: string;

    @IsString()
    @IsOptional()
    rating:number;

    @IsString()
    @IsOptional()
    discription:string;
}

export class BookingDto {
    @IsObject()
    @IsNotEmpty()
    event: EventDto;

    @IsObject()
    @IsNotEmpty()
    packageDetails: PackageDto;

    @IsNumber()
    @IsOptional()
    extraGuests: number;

    @IsNumber()
    @IsOptional()
    extraMeals: number;

    @IsNumber()
    @IsNotEmpty()
    totalGuests: number;

    @IsNumber()
    @IsOptional()
    totalMeals: number;

    @IsNotEmpty()
    @IsObject()
    branch: BranchDto;

    // @IsNotEmpty()
    // @IsObject()
    // userDetails: UserShortDto;

    @IsOptional()
    @IsObject()
    celebrantDetails: CelebrantDto;

    @IsNumber()
    @IsNotEmpty()
    eventDate: number;

    @IsNumber()
    @IsNotEmpty()
    eventTime: number;

    @IsBoolean()
    @IsOptional()
    isPrivate: boolean;

    @IsString()
    @IsOptional()
    eventType: string;

    @IsArray()
    @IsOptional()
    services: ServiceDto[];

    @IsString()
    @IsOptional()
    additionalRequests: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsOptional()
    e_invitation?: string;

    @IsString()
    @IsOptional()
    banner: string;

    @IsString()
    @IsOptional()
    uploadlogo:string;
    
    @IsString()
    @IsOptional()
    bowllingMedal:string;

    @IsString()
    @IsOptional()
    decoration:string;

    @IsString()
    @IsOptional()
    cancelReason:string;
    
    @IsString()
    @IsOptional()
    qrCode:string;
    @IsString()
    @IsOptional()
    review:RevuewDto;

    @IsNumber()
    @IsNotEmpty()
    eventEndTime:number;
    @IsNumber()
    @IsOptional()
    duration:number;
}

export class UpdateBookingDto {
    @IsObject()
    @IsOptional()
    event?: EventDto;

    @IsObject()
    @IsOptional()
    packageDetails?: PackageDto;

    @IsNumber()
    @IsOptional()
    extraGuests?: number;

    @IsNumber()
    @IsOptional()
    extraMeals?: number;

    @IsNumber()
    @IsOptional()
    totalGuests?: number;

    @IsNumber()
    @IsOptional()
    totalMeals?: number;

    @IsOptional()
    @IsObject()
    branch?: BranchDto;

    @IsOptional()
    @IsObject()
    userDetails?: UserShortDto;

    @IsOptional()
    @IsObject()
    celebrantDetails?: CelebrantDto;

    @IsString()
    @IsOptional()
    eventDate?: string;

    @IsNumber()
    @IsOptional()
    eventTime?: number;

    @IsBoolean()
    @IsOptional()
    isPrivate?: boolean;

    @IsString()
    @IsOptional()
    eventType?: string;

    @IsArray()
    @IsOptional()
    services?: ServiceDto[];

    @IsString()
    @IsOptional()
    additionalRequests?: string;

    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    e_invitation?: string;

    @IsString()
    @IsOptional()
    banner: string;

    @IsString()
    @IsOptional()
    uploadlogo:string;

    @IsString()
    @IsOptional()
    bowllingMedal:string;

    @IsString()
    @IsOptional()
    decoration:string;
    @IsString()
    @IsOptional()
    review:RevuewDto;

    @IsNumber()
    @IsOptional()
    eventEndTime:number;
    
    @IsNumber()
    @IsOptional()
    duration:number;

}

