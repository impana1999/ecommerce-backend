import { BookingStatus, BranchInterface, CelebrantInterface, EventInterface, PackageDetailsInterface, ServiceInterface } from "@/interfaces/booking/booking.interface";

// author Vishal
export default class BookingModel{
    private _event:EventInterface;
    private _packageDetails:PackageDetailsInterface;
    private _extraGuests:number;
    private _extraMeals:number;
    private _totalGuests:number;
    private _totalMeals:number;
    private _totalAmount:number;
    private _branch:BranchInterface;
    private _celebrantDetails:CelebrantInterface;
    private _eventDate:Date;
    private _eventTime:number;
    private _isPrivate:boolean;
    private _eventType:string;
    private _services:ServiceInterface;
    private _addtionalRequests:string;
    private _status:BookingStatus;
    private _e_invitation:string;
    private _banner:string;
    private _uploadlogo:string;
    private _bowllingMedal:string;
    private _decoration:string;
    private _cancelReason:string;
    private _qrCode:string;
    private _review:boolean;
    private _eventEndTime:number;
    private _duration:number
    private _createdAt:number;
    private _updatedAt:number;
   

    constructor ({
        event={id:"",type:""},
        packageDetails={id:"",name:"",quantity:null},
        extraGuests=null,
        extraMeals=null,
        totalGuests=null,
        totalMeals=null,
        totalAmount= 0,
        branch={id:"",name:""},
        celebrantDetails={name:"",birthDate:"",birthMonth:"",birthYear:""},
        eventDate=null,
        eventTime=null,
        isPrivate=false,
        eventType="",
        services={_id:"",name:"",type:"",imageUrl:"",label:"",description:"",amount:''},
        additionalRequests="",
        e_invitation="",
        banner="",
        uploadlogo="",
        bowllingMedal="",
        decoration="",
        cancelReason="",
        qrCode="",
        eventEndTime=null,
        duration=null,
        review=false,
        status=BookingStatus.PENDING,
        
        
       


    }){
        this._event=event;
        this._packageDetails=packageDetails;
        this._extraGuests=extraGuests;
        this._extraMeals=extraMeals;
        this._totalGuests=totalGuests;
        this._totalMeals=totalMeals;
        this._totalAmount=totalAmount;
        this._branch=branch;
        this._celebrantDetails=celebrantDetails;
        this._eventDate=eventDate;
        this._eventTime=eventTime;
        this._isPrivate=isPrivate;
        this._eventType=eventType;
        this._services=services;
        this._addtionalRequests=additionalRequests;
        this._status=status;
        this._uploadlogo=uploadlogo;
        this._e_invitation=e_invitation;
        this._banner=banner;
        this._bowllingMedal=bowllingMedal;
        this._decoration=decoration;
        this._cancelReason=cancelReason;
        this._qrCode=qrCode
        this._review=review
        this._eventEndTime=eventEndTime
        this._duration=duration

    }

    setEvent(value:EventInterface):void{
        this._event=value || null;
    }

    setPackageDetails(value:PackageDetailsInterface):void{
        this._packageDetails=value || null;
    }

    setExtraGuests(value:number):void{
        this._extraGuests=value || null;
    }

    setExtraMeals(value:number):void{
        this._extraMeals=value || null;
    }

    setTotalGuests(value:number):void{
        this._totalGuests=value || null;
    }

    setTotalMeals(value:number):void{
        this._totalMeals=value || null;
    }

    setTotalAmount(value:number):void{
        this._totalAmount=value || null;
    }

    setBranch(value:BranchInterface):void{
        this._branch=value || null;
    }

    setCelebrantDetails(value:CelebrantInterface):void{
        this._celebrantDetails=value || null;
    }

    setEventDate(value:Date):void{
        this._eventDate=value || null;
    }

    setEventTime(value:number):void{
        this._eventTime=value || null;
    }

    setIsPrivate(value:boolean):void{
        this._isPrivate=value || null;
    }

    setEventType(value:string):void{
        this._eventType=value || null;
    }

    setServices(value:ServiceInterface):void{
        this._services=value || null;
    }

    setAdditionalRequests(value:string):void{
        this._addtionalRequests=value || null;
    }

    setStatus(value:BookingStatus):void{
        this._status=value || null;
    }
    setEnvitaion(value:string):void{
        this._e_invitation=value || null;
    }   
    setbanner(value:string):void{
        this._banner=value || null;
    }
   
    setuploadlogo(value:string):void{
        this._uploadlogo=value || null;
    }
    
    setbowllingMedal(value:string):void{
        this._bowllingMedal=value || null;
    }
    
    setdecoration(value:string):void{
        this._decoration=value || null;
    }
    
    setcancelReason(value:string):void{
        this._cancelReason=value || null;
    }
    
    setqrCode(value:string):void{
        this._qrCode=value || null;
    }
    setreview(value:boolean):void{
        this._review=value || null;
    }

    setEventEndTime(value:number):void{
        this._eventEndTime=value || null;
    }
    
    setduration(value:number):void{
        this._duration=value || null;
    }

    
    getduration=(): number | null => this._duration;
    geteventEndTime=(): number | null => this._eventEndTime;
    getqrCode=(): string | null => this._qrCode;
    getcancelReason=(): string | null => this._cancelReason;
    getdecoration=(): string | null => this._decoration;
    getbowllingMedal=(): string | null => this._bowllingMedal;
    geteinvitaion=(): string | null => this._e_invitation;
    getuploadlogo=(): string | null => this._uploadlogo;
    
    getbanner=(): string | null => this._banner;
    getEvent = (): EventInterface | null => this._event;

    getPackageDetails = (): PackageDetailsInterface | null => this._packageDetails;

    getExtraGuests = (): number | null => this._extraGuests;

    getExtraMeals = (): number | null => this._extraMeals;

    getTotalGuests = (): number | null => this._totalGuests;

    getTotalMeals = (): number | null => this._totalMeals;

    getTotalAmount = (): number | null => this._totalAmount;

    getBranch = (): BranchInterface | null => this._branch;

    getCelebrantDetails = (): CelebrantInterface | null => this._celebrantDetails;

    getEventDate = (): Date | null => this._eventDate;

    getEventTime = (): number| null => this._eventTime;

    getIsPrivate = (): boolean | null => this._isPrivate;

    getEventType = (): string | null => this._eventType;

    getServices = (): ServiceInterface | null => this._services;

    getAdditionalRequests= (): string | null => this._addtionalRequests;

    getStatus = (): BookingStatus | null => this._status;

    getreview = (): boolean | null => this._review;

    getEntityMappings(){
        return{
            event:this.getEvent(),
            packageDetails:this.getPackageDetails(),
            extraGuests:this.getExtraGuests(),
            extraMeals:this.getExtraMeals(),
            totalGuest:this.getTotalGuests(),
            totalAmount: this.getTotalAmount(),
            branch:this.getBranch(),
            celebrantDetails:this.getCelebrantDetails(),
            eventDate:this.getEventDate(),
            eventTime:this.getEventTime(),
            isPrivate:this.getIsPrivate(),
            eventType:this.getEventType(),
            services:this.getServices(),
            additionalrequests:this.getAdditionalRequests(),
            status:this.getStatus(),
            e_invitation:this.geteinvitaion(),
            bowllingMedal:this.getbowllingMedal(),
            banner:this.getbanner(),
            uploadlogo:this.getuploadlogo(),
            cancelReason: this.getcancelReason(),
            decoration:this.getdecoration(),
            qrCode:this.getqrCode(),
            review:this.getreview(),
            eventEndTime:this.geteventEndTime(),
            duration:this.getduration(),
            createdAt: new Date().toISOString(),
            updateAt: new Date().toISOString(),
            

        }
    }

}