import {exploreCozmoInterface} from "@interfaces/index"

//Author : Srinivas
export default class ExploreCozmoModel {
  private _type: string;
  private _description: string;

  constructor({
    type="",
    description= ""
  }) {

    this._type = type;
    this._description =description;

  }


  setEmail(value: string): void {
    this._type = value;
  }

  setPassword(value: string): void {
    this._description = value;
  }

  gettitle = (): string | null => this._type;

  getimageUrl= (): string | null => this._description;
  getEntityMappings() {
    return {
      type: this.gettitle(),
      description: this.getimageUrl(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
    };
  }
}
