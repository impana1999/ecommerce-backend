import {CozmoServiceInerface} from "@interfaces/index"

//Author : Srinivas
export default class CheckoutModel {
  private _title: string;
  private _imageUrl: string;
  private _description: string;

  constructor({
    title="",
 imageUrl= "",
   description=""
  }) {

    this._title = title;
    this._imageUrl =imageUrl;
    this._description = description;

  }


  setEmail(value: string): void {
    this._title = value;
  }

  setPassword(value: string): void {
    this._imageUrl = value;
  }

  setCountryCode(value: string): void {
    this._description = value || null;
  }

  gettitle = (): string | null => this._title;

  getimageUrl= (): string | null => this._imageUrl;

  getdescription = (): string | null => this._description;

  


  getEntityMappings() {
    return {
      title: this.gettitle(),
      imageUrl: this.getimageUrl(),
      description: this.getdescription(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
    };
  }
}
