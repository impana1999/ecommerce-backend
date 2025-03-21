import  {Permissions } from "@/interfaces/index";

//Author : Srinivas
export default  class RoleModel {
  private _name: string;
  private _permissions:Permissions[];
  private _isActive: boolean;

  constructor({
    name = '',
    permissions =   [],
    isActive = true

  }) {

    this._name = name;
    this._permissions = permissions;
    this._isActive = isActive;

  }


  setName(value : string) : void {
    this._name = value || null;
  }

  setPermissions(value : Permissions[]) : void {
    this._permissions = value || null;
  }

  setIsActive(value: boolean) : void {
    this._isActive = value || false
  }


  getName = () : string | null => this._name;

  getPermissions = () : Permissions[] | null => this._permissions;

  getIsActive = () : boolean | null => this._isActive;


  getEntityMappings() {
    return {
      name : this.getName(),
      permissions : this.getPermissions(),
      isActive : this.getIsActive(),

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
    }
  }
}