
import {
  AdminAuthRoute,
  AdminUserRoute,
  AdminServicesRoute,
  AdminEventRoute,
  AdminBannerRoute,
  AdminLocationAuthRoute,
  AdminRoleAuthRoute,
  ProductRoute,
  CategoryRoute,
  SubCategoryRoute,
  PackageRoute
} from './admin/index';
import AuthRoute from './auth/auth.route';
import BookingRoute from './booking/booking.route';
import CartRoute from './cart/cart.route';
import HomepageRoute from './homepage/homepage.route';
import RatingRoute from './rating/rating.route';
import UploadRoute from './upload/upload.route';
import UserRoute from './user/user.route'
import wishlistRoute from './wishlist/wishlist.route'
import CozmoServiceRoute from "./admin/cozmoService/cozmoservice.route"
import AddAddressRoute from "./userAddress/userAddress.route"
import CheckoutRoute from "./checkout/checkout.route"
import ExploreCozmoRoute from "./admin/exploreCozmo/cozmoservice.route"
import OderRoute from "./orders/orders.route"
import FaqRoute from "./faq/faq.route"
import tournamentRoute from "./tournament/tournament.route"
import AdminSettingRoute from "./admin/setting/setting.route"
const router = [

  // Admin Routes
  new AdminAuthRoute(),
  new AdminUserRoute(),
  new AdminEventRoute(), 
  new AdminServicesRoute(),
  new AdminBannerRoute(),
  new AdminLocationAuthRoute(),
  new AdminLocationAuthRoute(),
  new AdminRoleAuthRoute(),
  new ProductRoute(),
  new CategoryRoute(),
  new SubCategoryRoute(),
  new BookingRoute(),
  new PackageRoute(),
  new RatingRoute(),
  new CartRoute(),
  new UserRoute(),
  new CozmoServiceRoute(),
  new ExploreCozmoRoute(),
  // Mobile Routes
  new AuthRoute(), 
  new HomepageRoute(),
  new UploadRoute(),
  new wishlistRoute(),
  new AddAddressRoute(),
  new CheckoutRoute(),
 //rating
 new RatingRoute(),
 new CartRoute(),
new OderRoute(),
new FaqRoute(),
 //user
 new tournamentRoute(),
 new AdminSettingRoute()
 
];
export default router;
