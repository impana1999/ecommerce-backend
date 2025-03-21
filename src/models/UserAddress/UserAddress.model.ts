import {AddressStatus,Coordinates1} from "@/interfaces/index";
import {v4 as uuidv4} from 'uuid';


// author : vishal
export default class LocationModel {
    private _userId:string;
    private _name: string;
    private _address: string;
    private _city: string;
    private _state: string;
    private _country: string;
    private _zipCode: string;
    private _coordinates:Coordinates1;
    private _status: string;

    constructor({
        userId="",
        name = "",
        address = "",
        city = "",
        state = "",
        country = "",
        zipCode = "",

        coordinates ={ lat:"", lng:"" },
        status = "",
    }) {

        this._name = name;
        this._address = address;
        this._city = city;
        this._state = state;
        this._country = country;
        this._zipCode = zipCode;
        this._coordinates =  coordinates;
        this._status = status;
        this._userId= userId;

    }

    

    setuserId(value: string): void {
        this._userId = value;
    }

    setName(value: string): void {
        this._name = value;
    }

    setAddress(value: string): void {
        this._address = value || null;
    }

    setCity(value: string): void {
        this._city = value || null;
    }

    setState(value: string): void {
        this._state = value || null;
    }

    setCountry(value: string): void {
        this._country = value || null;
    }

    setZipCode(value: string): void {
        this._zipCode = value || null;
    }

    setCoordinates(value:Coordinates1): void {
        this._coordinates = value || null;
    }
    setStatus(value: string): void {
        this._status = value || null;
    }


    getName = (): string | null => this._name;

    getAddress = (): string | null => this._address;

    getCity = (): string | null => this._city;

    getState = (): string | null => this._state;

    getCountry = (): string | null => this._country;

    getZipCode = (): string | null => this._zipCode;

    getCoordinates = (): Coordinates1| null => this._coordinates;

    getStatus = (): string | null => this._status;
    getuserId= (): string | null => this._userId;
    

    getEntityMappings() {
        return {
            name: this.getName(),
            address: this.getAddress(),
            city: this.getCity(),
            state: this.getState(),
            country: this.getCountry(),
            zipCode: this.getZipCode(),
            coordinates: this.getCoordinates(),
            status: this.getStatus(),
            userId: this.getuserId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    }
}