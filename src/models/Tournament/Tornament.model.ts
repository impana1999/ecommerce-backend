
// Author:impana
// Created TokenModel 
export default class TournamentModel {
  private _title:string;
  private _description: string;
  private _imageUrl: string;
  private _totalEntries: number;
  private _date: number;
  private _time: number;
  private _totalAmount:number;
  private _totalEntriesLeft:number
  
  constructor({ 
    title = "", 
    description= '', 
    imageUrl = '', 
    totalEntries=null,
    date= null,
    time=null,
    totalAmount= null,
    totalEntriesLeft=null

   }) {

    this._title = title;
    this._description= description;
    this._imageUrl = imageUrl;
    this._date=date;
    this._time=time;
    this._totalAmount=totalAmount;
    this._totalEntries=totalEntries;
    this._totalEntriesLeft=totalEntriesLeft;
  }
  

  settitle(value: string): void {
    this._title  = value;
  }
  
  setdescription(value: string): void {
    this._description = value;
  }

  setdate(value: number): void {
    this._date= value;
  }

  settime(value: number): void {
    this._time= value;
  }
  setimageUrl(value: string): void {
    this._imageUrl = value;
  }

  settotalEntries(value: number): void {
    this._totalEntries = value;
  }

  settotalAmount(value: number): void {
    this._totalAmount = value;
  }
  settotalEntriesLeft(value: number): void {
    this._totalEntriesLeft = value;
  }
  
  gettitle= (): string => this._title;
  
  getdescription= (): string => this._description;

  getdate = (): number | null => this._date;
  gettime = (): number | null => this._time;

  getimageUrl = (): string | null => this._imageUrl;

  gettotalEntries = (): number | null => this._totalEntries ;

  gettotalAmount =(): number | null => this._totalAmount;

  gettotalEntriesLeft =(): number | null => this._totalEntriesLeft;

  
  getEntityMappings() {
    return {
      title: this.gettitle(),
      description:this.getdescription(),
      date: this.getdate(),
      time: this.gettime(),
      imageUrl:this.getimageUrl(),
      totalEntries:this.gettotalEntries(),
     totalAmount:this.gettotalAmount(),
     totalEntriesLeft:this.gettotalEntriesLeft(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}