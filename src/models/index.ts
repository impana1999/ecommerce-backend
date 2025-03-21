// User related models
import UserModel from "./User/User.Schema";
import TokenModel from "./Tokens/Token.Schema";
import HomeModel from "./Home/Home.model";
import { BookingModel,BookingSchema } from "./Booking/Booking.Schema"

// Admin related models
import LocationModel from "./Location/Location.model";

import LocationSchemaModel from "./Location/Location.Schema";
import EventModel from "./Event/Event.Schema";
import BannerModel from "./Banners/Banner.model";
import BannerSchemaModel from "./Banners/Banner.Schema";
import ServiceModel from "./Event/Services.model"
import ServiceSchemaModel from "./Event/Services.Schema"
import RoleModel from "./Admin/Role.Schema";
import {AdminModel, AdminSchema} from "./Admin/Admin.Schema";
import AdminTokenModel from "./Admin/AdminToken.model";
import { AdminTokenSchemaModel } from "./Admin/AdminToken.Schema";
import ProductModel from "./Product/Product.Schema";
import CategoryModel from "./Category/Category.Schema";
import SubCategoryModel from "./SubCategory/SubCategory.Schema";
import PackageModel from "./Package/Package.Schema";
import { RatingSchema, RatingModel } from "./Rating/Ratings.Schema"
//import CartModel from "./Cart/Cart.model";
import {CartModel, CartSchema} from "./Cart/CartSchema";
import {wishlistModel} from "./Wishlist/WislistSchema"
import {CozmoServiceModel} from "./Admin/cozmoService.Schema"
import {AddressModel} from './UserAddress/UserAddress.Schema'
import {CheckoutModel} from './Checkout/Checkout.Schema'
import {ExploreCozmoModel} from './Admin/exploreCozmo'
import {OrderModel} from './Orders/Order.Schema'
import {FaqModel} from './Faq/faq.Schema'
import {TournamentModel} from './Tournament/Tornament.Schema'
import {AdminSettingModel} from './Admin/AdminSetting.Schema'
export {
    AdminSchema,
    BookingSchema,
    AdminTokenSchemaModel,
    BannerSchemaModel,
    ServiceSchemaModel,
    LocationSchemaModel,
    RatingSchema,
    RatingModel,
    UserModel,
    TokenModel,
    AdminModel,
    AdminTokenModel,
    EventModel,
    HomeModel,
    LocationModel,
    BannerModel,
    ServiceModel,
    RoleModel,
    ProductModel,
    CategoryModel,
    SubCategoryModel,
    PackageModel,
    BookingModel,
    CartModel,
    AddressModel,
    wishlistModel,
    CozmoServiceModel,
    CheckoutModel,
    ExploreCozmoModel,
    OrderModel,
    FaqModel,
    TournamentModel,
    AdminSettingModel
}
