// name  imageUrl  status  services  createdAt updatedAt

//Author: GAURAV KUMAR
export default class EventModel {
  private _name: string;
  private _imageUrl: string;
  private _status: string;
  private _services: any[];

  constructor({ name = '', imageUrl = '', status = '', services = [] }) {
    this._name = name;
    this._imageUrl = imageUrl;
    this._status = status;
    this._services = services;
  }

  setName(value: string): void {
    this._name = value;
  }

  setImageUrl(value: string): void {
    this._imageUrl = value;
  }

  setStatus(value: string): void {
    this._status = value;
  }

  setServices(value: any[]): void {
    this._services = value;
  }

  getName = (): string | null => this._name;

  getImageUrl = (): string | null => this._imageUrl;

  getStatus = (): string | null => this._status;

  getServices = (): any[] | null => this._services;

  getEntityMappings() {
    return {
      name: this.getName(),
      imageUrl: this.getImageUrl(),
      status: this.getStatus(),
      services: this.getServices(),

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
