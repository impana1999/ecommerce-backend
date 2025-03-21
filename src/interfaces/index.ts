import { Routes } from './misc/routes.interface';
import { IConfig } from './misc/config.interface';
import { TokenPayload } from './token/payload.interface';
import { UserStatus, SocialInterface, UserInterface, } from './user/user.interface';
import { AdminStatus, Roles } from "./auth/auth.interface"
import { Permissions } from './role/role.interface';
import { BranchManager, Coordinates, LocationStatus } from './location/location.inerface';
import { Category, Subcategory, Product } from './product/product.interface';
import { BookingInterface,BookingStatus, CalculateBookingTotalInterface } from './booking/booking.interface';
import {RatingInterface} from "./ratings/ratings.interface"
import { CartStatus,CartInterface,ProductDetails,Specifications } from './cart/cart.interface';
import { EventStatus, EventTypes } from './event/event.interface';
import { GAMES, PackageStatus } from './package/package.interface';
import { wishlistStatus,ProductDetails1,wishlistInterface } from './whishlist/whishlist.interface';
import {CozmoServiceInerface} from './cozmoService/cozmo.interface';
import{CheckoutInterface,pickuplocation,diliverLocation,ProductDetails2,CheckoutStatus,Specifications2} from './chekout/checkout.interface'
import{AddressStatus,Coordinates1} from './useraddress/useraddress.inerface'
import {exploreCozmoInterface} from './explorecoxmo/exploreCozmo.interface'
import {OrderInterface,ProductDetails4,diliverLocation1,pickuplocation1} from './orders/orders.interface'
import {faqInterface} from './faq/faq.inerface'
import {tournamentInterface} from './tournament/tornament.interface'
import {admisettingInerface} from './adminsetting/adminsetting.interface'

export {
    // Interfaces
    SocialInterface,
    UserInterface,
    BookingInterface,
    CalculateBookingTotalInterface,
    IConfig,
    Routes,
    CheckoutStatus,
    TokenPayload,
    Permissions,
    Category,
    Subcategory,
    Product,
    RatingInterface,
    CartInterface,
    ProductDetails,
    Specifications,
    Roles,
    diliverLocation,
    ProductDetails2,
    CheckoutInterface,
    pickuplocation,
    EventStatus,
    wishlistInterface,
    Coordinates,
    BranchManager,
    ProductDetails1,
    ProductDetails4,
    CozmoServiceInerface,
    AddressStatus,
    Coordinates1,
    exploreCozmoInterface,
    faqInterface,
    // enums
    UserStatus,
    AdminStatus,
    BookingStatus,
    CartStatus,
    LocationStatus,
    EventTypes,
    GAMES,
    diliverLocation1,
    pickuplocation1,
    PackageStatus,
    wishlistStatus,
    OrderInterface,
    tournamentInterface,
    admisettingInerface
};
