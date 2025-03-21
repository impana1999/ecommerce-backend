import { UserStatus } from "@/interfaces/index";

// author : vishal
export default class BannerModel {
    private _title:string;
    private _text:string;
    private _subText:string;
    private _imageUrl:string;
    private _description:string;
    private _expiryDate:number;
    private _active:boolean;
    private _status:UserStatus;

    constructor({
        title="",
        text="",
        subText="",
        imageUrl="",
        description="",
        expiryDate=0,
        active=false,
        status=UserStatus.INACTIVE
    }){

        this._title=title;
        this._text=text;
        this._subText=subText;
        this._imageUrl=imageUrl;
        this._description=description;
        this._expiryDate=expiryDate;
        this._active=active;
        this._status=status;

    }
 

    setTitle(value:string):void {
        this._title=value || null;
    }
    setText(value:string):void {
        this._text=value || null;
    }

    setSubText(value:string):void {
        this._subText=value || null;
    }

    setImageUrl(value:string):void {
        this._imageUrl=value || null;
    }

    setDescription(value:string):void {
        this._description=value || null;
    }

    setExpiryDate(value:number):void {
        this._expiryDate=value;
    }

    setActive(value:boolean):void {
        this._active=value || false;
    }

    setStatus(value:UserStatus):void {
        this._status=value || null;
    }
    
    

    getTitle = ():string | null => this._title;

    getText = ():string | null => this._text;

    getSubText = ():string | null => this._subText;

    getImageUrl = ():string | null => this._imageUrl;

    getDescription = ():string | null => this._description;

    getExpiryDate = ():number | null => this._expiryDate;

    getActive = ():boolean | null => this._active;

    getStatus = ():UserStatus | null => this._status;


    getEntityMappings() {
        return {
            title:this.getTitle(),
            text:this.getText(),
            subText:this.getSubText(),
            imageUrl:this.getImageUrl(),
            description:this.getDescription(),
            expiryDate:this.getExpiryDate(),
            active:this.getActive(),
            statis:this.getStatus(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
    }
}