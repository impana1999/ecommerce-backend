import { UserDetails,likerDetails } from "@/interfaces/ratings/ratings.interface";

export default class RatingModel{
    private _productId: string;
    private _userDetails:UserDetails;
    private _rating:number;
    private _review:string;
    private _likes:number;
    private _dislikes:number;
    private _eventId:string;
    private _imageUrl:string;
    private _reviewType:string;
    private _likerDetails:likerDetails[];

    constructor({
        productId="",
        userDetails={id:"",name:"",profilePic:""},
        rating=null,
        review="",
        likes=null,
        dislikes=null,
        eventId='',
        imageUrl=" ",
        reviewType=" ",
        likerDetails=[{id:"",isliked:false,isdisliked:false,isDeleted:false,isHidden:false}]
    }){
        this._productId=productId;
        this._userDetails=userDetails;
        this._rating=rating;
        this._review=review;
        this._likes=likes;
        this._dislikes=dislikes;
        this._eventId=eventId
        this._imageUrl=imageUrl
        this._reviewType=reviewType
        this._likerDetails=likerDetails;

    }

    setProductId(value: string): void {
        this._productId = value || null;
      }

    setUserDetails(value:UserDetails): void {
        this._userDetails = value || null;
      }

    setRating(value: number): void {
        this._rating = value || null;
      }

    setReview(value: string): void {
        this._review = value || null;
      }

    setLikes(value: number): void {
        this._likes = value || null;
      }

    setDislikes(value: number): void {
        this._dislikes = value || null;
      }
      seteventId(value: string): void {
        this._eventId= value || null;
      }
      setimageUrl(value: string): void {
        this._imageUrl= value || null;
      }
      setreviewType(value: string): void {
        this._reviewType= value || null;
      }
      setlikerDetails(value: []): void {
        this._likerDetails= value || null;
      }
      
      getProductId = (): string | null => this._productId;

      getUserDetails = (): UserDetails | null => this._userDetails;

      getRating = (): number | null => this._rating;

      getReview = (): string | null => this._review;

      getLikes = (): number | null => this._likes;

      getDislikes= (): number | null => this._dislikes;

      geteventId = (): string| null => this._eventId;

      getimageUrl= (): string| null => this._imageUrl;

      getreviewType= (): string| null => this._reviewType;
      
      getlikerDetails= ():  any[] | null =>this._likerDetails;
      
      getEntityMappings(){
        return{
            productId:this.getProductId(),
            userDetails:this.getUserDetails(),
            rating:this.getRating(),
            review:this.getReview(),
            likes:this.getLikes(),
            dislikes:this.getDislikes(),
            imageUrl:this.getimageUrl(),
            likerDetails:this.getlikerDetails(),
            eventId:this.geteventId(),
            reviewType:this.getreviewType(),
            createdAt: new Date().toISOString(),
            updatedAt:new Date().toISOString()
        }
      }


}