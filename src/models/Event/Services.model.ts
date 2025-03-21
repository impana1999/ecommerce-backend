// name  imageUrl  status  services  createdAt updatedAt

//Author: GAURAV KUMAR
class Details {
  private _label: string;
  private _imageUrl: string;
  private _description: string;
  private _amount: string;
 private _mealType: string;

  constructor(label: string, imageUrl: string, description: string,amount:string,mealType:string) {
    this._label = label;
    this._imageUrl = imageUrl;
    this._description = description;
    this._amount= amount;
    this._mealType= mealType;
  }
}

export default class ServicesModel {
  private _name: string;
  private _imageUrl: string;
  private _type: string;
  private _details: Details[];

  constructor({ name = '', imageUrl = '', status = '', details}) {
    this._name = name;
    this._imageUrl = imageUrl;
    this._type = status;
    this._details = details || new Details('', '', '','','');
  }

  setName(value: string): void {
    this._name = value;
  }

  setImageUrl(value: string): void {
    this._imageUrl = value;
  }

  setType(value: string): void {
    this._type = value;
  }

  setDetails(value: any[]): void {
    this._details = value;
  }

  getName = (): string | null => this._name;

  getImageUrl = (): string | null => this._imageUrl;

  getType = (): string | null => this._type;

  getDetails = (): any[] | null => this._details;

  getEntityMappings() {
    return {
      name: this.getName(),
      imageUrl: this.getImageUrl(),
      type: this.getType(),
      details: this.getDetails(),

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
