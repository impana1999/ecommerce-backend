import {exploreCozmoInterface} from "@interfaces/index"

//Author : Srinivas
export default class ExploreCozmoModel {
  private _title: string;
  private _imageUrl: string;

  constructor({
    title="",
 imageUrl= ""
  }) {

    this._title = title;
    this._imageUrl =imageUrl;

  }


  setEmail(value: string): void {
    this._title = value;
  }

  setPassword(value: string): void {
    this._imageUrl = value;
  }

  gettitle = (): string | null => this._title;

  getimageUrl= (): string | null => this._imageUrl;

  


  getEntityMappings() {
    return {
      title: this.gettitle(),
      imageUrl: this.getimageUrl(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
    };
  }
}
