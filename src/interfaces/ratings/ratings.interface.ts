export  interface  UserDetails  {
    id: string,
    name: string,
    profilePic: string
}
export  interface likerDetails{
    id:string
    isliked:boolean,
    isDeleted: boolean,     // Set and updated by user
    isHidden: boolean,
    isdisliked:boolean
}

export interface RatingInterface {
    productId: string,
    eventId: string;
    userDetails: UserDetails,
    rating: number,     // 1 to 5 limit
    review: string,
    likes: number,
    dislikes: number,      // Set predefined and updated by admin
    createdAt: number,
    updatedAt: number,
    imageUrl: string,
    reviewType:string,
    likerDetails:likerDetails[]
    
    
}
