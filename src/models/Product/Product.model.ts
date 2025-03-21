import { Category, Subcategory, Product } from '@/interfaces';

//Author : Srinivas
export default class ProductModel {

  private _name: string;
  private _imageUrl:any[];
  private _description: string;
  private _price: string;
  private _daysToReturn : string;
  private _availability : number;
  private _features: any[];
  private _createdAt:number;
  private updatedAt :number;

  constructor({ name = '', imageUrl =[ ], description = '', price = '', daysToReturn='', availability=0, features = [] }) {
    this._name = name;
    this._imageUrl =imageUrl;
    this._description = description;
    this._price = price;
    this._daysToReturn = daysToReturn;
    this._availability = availability;
    this._features = features;


  }


  setName(value: string): void {
    this._name = value || null;
  }

  setImageUrl(value: []): void {
    this._imageUrl = value || null;
  }

  setDescription(value: string): void {
    this._description = value || null;
  }

  setPrice(value: string): void {
    this._price = value || null;
  }

  setDaysToReturn(value: string): void {
    this._daysToReturn = value || null;
  }

  setAvailability(value: number): void {
    this._availability = value || null;
  }

  setFeatures(value: any[]): void {
    this._features = value || null;
  }


  getName = (): string | null => this._name;

  getImageUrl = (): any[] | null => this._imageUrl;

  getDescription = (): string | null => this._description;

  getPrice = (): string | null => this._price;

  getDaysToReturn = (): string | null => this._daysToReturn;

  getAvailability = (): number | null => this._availability;

  getFeatures = (): any[] | null => this._features;


  getEntityMappings() {
    return {
      name: this.getName(),
      imageUrl: this.getImageUrl(), 
      description: this.getDescription(),
      price: this.getPrice(),
      daysToReturn : this.getDaysToReturn(),
      availability : this.getAvailability(),
      features: this.getFeatures(),

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

    };
  }
}
