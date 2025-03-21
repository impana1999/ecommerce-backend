import { OrderInterface ,ProductDetails4,pickuplocation1,diliverLocation1,} from "@/interfaces/index";

// author : vishal
export default class OrderModel {
    private _amount:number;
    private _currency: string;
    private _receipt:string;
    private _customerId:string;
    private _orderId:string;
    private _amount_paid:string;
    private _amount_due:string;
    private _status:string;
    private _productDetails: ProductDetails4[];
    private _eventId:string;
    private _pickuplocation:pickuplocation1;
  private _diliverLocation:diliverLocation1;
    private _razorpay_payment_id:string;
    private _razorpay_signature:string;
    private _isOrdered:boolean;
    private _tournamentId:string;
    private _orderType:string;
    private _isCancelled:boolean;
    private _qrCode:string;
    constructor({
        amount = 0,
        currency="",
        receipt = "",
        customerId = "",
        orderId = "",
        amount_paid = "",
        amount_due="",
        status="",
        productDetails = [{id: "" , name: "", imageUrl: "",quantity:null, price: 0, specifications: [{feature:[],selected: "", unit : ""}]}],
        eventId="",
        userId="",
        razorpay_payment_id="",
        razorpay_signature="",
        isOrdered=false,
        tournamentId="",
        orderType="",
        isCancelled=false,
        qrCode="",
        pickuplocation={branchId:"",name:'',address:'',city:'',state:'',country:'',imageUrl:'',zipCode:''},
        diliverLocation={name:'',address:'',city:'',state:'',country:'',imageUrl:'',zipCode:'',AddressId:''},
    }) {

         this._amount=amount;
         this._currency= currency;
         this._receipt=receipt;
         this._customerId=customerId;
         this._orderId=orderId;
        this._amount_paid=amount_paid;
        this._amount_due=amount_due;
        this._status=status;
        this._productDetails=productDetails
        this._eventId =eventId;
        this._razorpay_payment_id=razorpay_payment_id
        this._razorpay_signature=razorpay_signature,
        this._isOrdered=isOrdered,
        this._tournamentId=tournamentId;
        this._orderType=orderType;
        this._isCancelled=isCancelled
        this._qrCode=qrCode;
        this._pickuplocation=pickuplocation;
        this._diliverLocation=diliverLocation;
    }


    setamount(value: number): void {
        this._amount = value;
    }

    setcurrency(value: string): void {
        this._currency = value || null;
    }

    setreceipt(value: string): void {
        this._receipt = value || null;
    }

    setcustomerId(value: string): void {
        this._customerId = value || null;
    }

    setorderId(value: string): void {
        this._orderId = value || null;
    }

    setamount_paid(value: string): void {
        this._amount_paid = value || null;
    }

    setamount_due(value:string): void {
        this._amount_due = value || null;
    }

    setStatus(value: string): void {
        this._status = value || null;
    }
    setproductDetails(value:  ProductDetails4[]): void {
        this._productDetails = value || null;
    }
    seteventId(value: string): void {
        this._eventId = value || null;
    }
    setrazorpay_payment_id(value: string): void {
        this._razorpay_payment_id = value || null;
    }
    setrazorpay_signature(value: string): void {
        this._razorpay_signature = value || null;
    }
    setisOrdered(value: boolean): void {
        this._isOrdered = value || null;
    }
    settournamentId(value: string): void {
        this._tournamentId = value || null;
    }
    setorderType(value: string): void {
        this._orderType= value || null;
    }
    setisCancelled(value: boolean): void {
        this._isCancelled= value || null;
    }
    setisqrCode(value: string): void {
        this._qrCode= value || null;
    }
    setispickuplocation(value: pickuplocation1): void {
        this._pickuplocation = value || null;
      }
      setisdiliverLocation(value: diliverLocation1): void {
        this._diliverLocation = value || null;
      }
    
    getamount_due = (): string | null => this._amount_due;

    getamount_paid = (): string | null => this._amount_paid;

    getorderId = (): string | null => this._orderId;

    getcustomerId = (): string | null => this._customerId;

    getreceipt = (): string | null => this._receipt;

    getcurrency = (): String | null => this._currency;
    getdiliverLocation  = (): object | null => this._diliverLocation ;

  getpickuplocation = (): object | null => this._pickuplocation;

    getamount = (): number | null => this._amount;

    getStatus = (): string | null => this._status;

    getproductDetails= ():  ProductDetails4[] | null => this._productDetails;
    
    geteventId= (): string | null => this._eventId;
    

    getrazorpay_payment_id= (): string | null => this._razorpay_payment_id;

    getrazorpay_signature= (): string | null => this._razorpay_signature;

    getisOrdered= (): boolean | null => this._isOrdered;

    gettournamentId= (): string | null => this._tournamentId;

    getorderType= (): string | null => this._orderType;

    getisCancelled= (): boolean | null => this._isCancelled;

    getqrCode= (): string | null => this._qrCode;
    
    
    getEntityMappings() {
        return {
           amount_due: this.getamount_due(),
           amount_paid: this.getamount_paid(),
           orderId: this.getorderId(),
           customerId: this.getcustomerId(),
           receipt: this.getreceipt(),
           currency: this.getcurrency(),
           amount: this.getamount(),
            status: this.getStatus(),
            ProductDetails:this.getproductDetails(),
            eventId:this.geteventId(),
            isOrdered:this.getisOrdered(),
            razorpay_signature:this.getrazorpay_signature(),
            razorpay_payment_id:this.getrazorpay_payment_id(),
            orderType:this.getorderType(),
            isCancelled:this.getisCancelled(),
            qrCode:this.getqrCode(),
            pickuplocation:this.getpickuplocation(),
            diliverLocation:this.getdiliverLocation(),
            tournamentId:this.gettournamentId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    }
}