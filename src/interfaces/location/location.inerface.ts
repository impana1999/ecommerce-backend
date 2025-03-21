// author: vishal

export enum LocationStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED',
    CLOSED = 'CLOSED'
}

export interface Coordinates {
    lat:string,
    lng:string,
}

export interface BranchManager {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePictureUrl: string,
    role: string,
}


