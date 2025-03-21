import { BranchManager, Coordinates } from "@/interfaces/index";
import {v4 as uuidv4} from 'uuid';


// author : vishal
export default class LocationModel {
    private _name: string;
    private _address: string;
    private _city: string;
    private _state: string;
    private _country: string;
    private _zipCode: string;
    private _coordinates:Coordinates;
    private _imageUrl: string;
    private _branchCode: string;
    private _branchManager:BranchManager;
    private _status: string;
    private _isActive: boolean;
    private _services: any[];

    constructor({
        name = "",
        address = "",
        city = "",
        state = "",
        country = "",
        zipCode = "",

        coordinates ={ lat:"", lng:"" },
        imageUrl = "",
        branchCode = "",
        branchManager ={id: "" ,firstName: "", lastName: "", email: "", profilePictureUrl: "",role: ""},

        status = "",
        isActive = false,
        services = [],
    }) {

        this._name = name;
        this._address = address;
        this._city = city;
        this._state = state;
        this._country = country;
        this._zipCode = zipCode;
        this._coordinates =  coordinates;
        this._imageUrl = imageUrl;
        this._branchCode = branchCode;
        this._branchManager = branchManager;
        this._status = status;
        this._isActive = isActive;
        this._services = services;

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

    setCoordinates(value:Coordinates): void {
        this._coordinates = value || null;
    }

    setImageUrl(value: string): void {
        this._imageUrl = value || null;
    }

    setBranchCode(value: string): void {
        this._branchCode = value || null;
    }

    setBranchManager(value: BranchManager): void {
        this._branchManager = value || null;
    }

    setStatus(value: string): void {
        this._status = value || null;
    }

    setIsActive(value: boolean): void {
        this._isActive = value || null;
    }

    setServices(value: []): void {
        this._services = value || null;
    }


    getName = (): string | null => this._name;

    getAddress = (): string | null => this._address;

    getCity = (): string | null => this._city;

    getState = (): string | null => this._state;

    getCountry = (): string | null => this._country;

    getZipCode = (): string | null => this._zipCode;

    getCoordinates = (): Coordinates | null => this._coordinates;

    getImageUrl = (): string | null => this._imageUrl;

    getBranchCode = (): string | null => this._branchCode;

    getBranchManager = (): BranchManager | null => this._branchManager;

    getStatus = (): string | null => this._status;

    getIsActive = (): boolean | null => this._isActive;

    getServices = (): any[] | null => this._services;


    getEntityMappings() {
        return {
            name: this.getName(),
            address: this.getAddress(),
            city: this.getCity(),
            state: this.getState(),
            country: this.getCountry(),
            zipCode: this.getZipCode(),
            coordinates: this.getCoordinates(),
            imageUrl: this.getImageUrl(),
            branchCode: this.getBranchCode(),
            branchManager: this.getBranchManager(),
            status: this.getStatus(),
            isActive: this.getIsActive(),
            services: this.getServices(),

            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    }
}