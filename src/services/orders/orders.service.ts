// import { getUserID, incrementUserID } from '@/utils/generate-user-id';
import { HttpException } from '@exceptions/HttpException';
import { OrderModel,CheckoutModel,CartModel,TournamentModel,ProductModel,UserModel } from '@models/index';
import Razorpay from 'razorpay'
import * as qr from 'qrcode';
import qrCode from 'razorpay/dist/types/qrCode';
export default class OrdersService {
  private OrderModel = OrderModel;
  private CheckoutModel=CheckoutModel;
  private CartModel=CartModel;
  private TournamentModel=TournamentModel;
  private productmodel = ProductModel;
  private userModel=UserModel;
  //Author : Impana
  //Creates new product item added to the cart
  // public async createOrder(orderInput: {
  //   userId:string,
  //   productDetails: {
  //     id: string;
  //     name: string;
  //     imageUrl: string;
  //     quantity:number
  //     specifications: [
  //       {
  //         feature: [{
  //           type:[],
  //           name:string,
  //           unit: string
  //       }];
  //         selected: string;
  //         unit: string;
  //       }
  //     ];
  //     price: number;
  //   }[],
  //   eventId:string,
  //   tournamentId:string;
  //   amount: number,
  //   currency: string,
  //   customer_id: string,
  //   orderId: string,
  //   amountPaid: string,
  //   amount_due: string,
  //   status: string,
  //   receipt:string,
  //   quantity:string;
  //   orderType:string;
  // }) {
  //   try {
  //     const razorpayGlobalInstance = new Razorpay({
  //       key_id: 'rzp_test_1d8Uz0Rqn101Hj',
  //       key_secret: 'DREkz3zAKcStej7cslGOdYLy',
  //     });
  
  //     const orderData  = {
  //       amount: orderInput.amount,
  //       currency: orderInput.currency || 'INR',
  //       receipt: orderInput.receipt || 'order_receipt', // Using orderId for receipt if available, else using 'order_receipt'
  //       customer_id: orderInput.customer_id // Correcting variable name to match the parameter
  //     };
  // console.log(orderData )
  //     const order = await razorpayGlobalInstance.orders.create(orderData);
  //     console.log(order)
  //     const newOrder = await this.OrderModel.create({
  //       userId:orderInput.userId,
  //       productDetails:orderInput.productDetails,
  //       eventId:orderInput.eventId,
  //       amount: order.amount,
  //       currency: order.currency,
  //       customerId: orderInput.customer_id, // Correcting variable name to match the model attribute
  //       orderId: order.id,
  //       status: orderInput.status,
  //       receipt: order.receipt,
  //       amountPaid:order.amount_paid,
  //       amount_due:order.amount_due,
  //       isOrdered:true,
  //       orderType:orderInput.orderType,
  //       tournamentId:orderInput.tournamentId
  //     });
  
  //     const response = {
  //       newOrder
  //     };
  //     const productIdsToDelete = orderInput.productDetails?.map(product => product.id.toString()) ?? [];
  //     await this.CheckoutModel.findOneAndDelete({userId:orderInput.userId,"productDetails.id":{$in:productIdsToDelete}})
  //     await this.CartModel.deleteMany({userId:orderInput.userId,"productDetails.id":{$in:productIdsToDelete}})
  //     await this.TournamentModel.updateOne({_id:orderInput.tournamentId},{$inc: { totalEntriesLeft: -1 }})
  //     return response;
  //   } catch (err) {
  //     throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
  //   }
  // }
   //Author : Impana
  public async gettokens(customerId:string, updatedData: any) {
    try {
      const orders = await this.OrderModel.findOne({customerId:customerId})

      if (!orders) {
        console.log(`No Items found }`);
        throw new HttpException(404, 'No Items found');
      } else {
        if (updatedData.razorpay_payment_id) {
          orders.razorpay_payment_id = updatedData.razorpay_payment_id;
        }
        if (updatedData.razorpay_payment_id) {
          orders.razorpay_signature = updatedData.razorpay_signature;
        }

      }
      return orders;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
   //Author : Impana
  public async getMyorders(userId:string) {
    try {
      const orders = await this.OrderModel.find({userId:userId,isOrdered:true,isCancelled:false})

      if (!orders) {
        console.log(`No Items found }`);
        throw new HttpException(404, 'No Items found');
      }
      return orders;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async getorders(orderId:string) {
    try {
      const order = await this.OrderModel.findOne({_id:orderId,isOrdered:true})

      if (!order) {
        console.log(`No Items found }`);
        throw new HttpException(404, 'No Items found');
      }
      return order;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async createOrder(orderInput: {
    userId: string;
    productDetails?: {
        id: string;
        name: string;
        imageUrl: string;
        specifications: {
            feature: {
                name: string;
                type: string[];
                unit: string;
            }[];
            selected: string;
            unit: string;
        }[];
        price: number;
        availability:number;
        quantity:number;
    }[];
    eventId: string,
    tournamentId: string;
    amount: number,
    currency: string,
    customer_id: string,
    orderId: string,
    amountPaid: string,
    amount_due: string,
    status: string,
    receipt: string,
    quantity: string;
    orderType: string;
    pickuplocation: {
      branchId: string;
      name: string;
      address: string;
      city: string;
      state: string;
      country: string;
      imageUrl: string;
      zipCode: string;
    };
    diliverLocation: {
      AddressId: string;
      name: string;
      address: string;
      city: string;
      state: string;
      country: string;
      imageUrl: string;
      zipCode: string;
    };
}) {
    try {
        const razorpayGlobalInstance = new Razorpay({
            key_id: 'rzp_test_1d8Uz0Rqn101Hj',
            key_secret: 'DREkz3zAKcStej7cslGOdYLy',
        });
        const userData = await this.userModel.findOne({_id:orderInput.userId},{_id:1,firstName:1,lastName:1,profilePicture:1});
        if (!userData) throw new HttpException(401, 'Invalid User');
  
        const userDetails = {
          id: userData._id,
          name: `${userData.firstName} ${userData.lastName}`,
          profile_img:userData.profilePicture
        }
  


        const qrCodeData = JSON.stringify(orderInput);
        const generatedQRCode = await qr.toDataURL(qrCodeData);
        const response = [];

        // Check if productDetails exist and it's an array, or set a default empty array
        const productsToInsert = orderInput.productDetails || [];

        if (Array.isArray(productsToInsert) && productsToInsert.length > 0) {
            for (const product of productsToInsert) {
                  const orderData  = {
        amount: orderInput.amount,
        currency: orderInput.currency || 'INR',
        receipt: orderInput.receipt || 'order_receipt', // Using orderId for receipt if available, else using 'order_receipt'
        customer_id: orderInput.customer_id // Correcting variable name to match the parameter
      };
                const order = await razorpayGlobalInstance.orders.create(orderData);
                console.log(order)
                const newOrder = await this.OrderModel.create({
                  userDetails: userDetails,
                    productDetails: [product],
                    eventId: orderInput.eventId,
                    amount: orderInput.amount,
                    currency: order.currency,
                    customerId: orderInput.customer_id,
                    orderId: order.id,
                    status: orderInput.status,
                    receipt: order.receipt,
                    amountPaid: order.amount_paid,
                    amount_due: order.amount_due,
                    isOrdered: true,
                    orderType: orderInput.orderType,
                    tournamentId: orderInput.tournamentId,
                    qrCode:generatedQRCode,
                    pickuplocation:orderInput.pickuplocation,
                    diliverLocation:orderInput.diliverLocation,
                    // Include other properties from orderInput and order as needed
                });

                response.push({ newOrder });
            }
        } else {
          const orderData  = {
            amount: orderInput.amount,
            currency: orderInput.currency || 'INR',
            receipt: orderInput.receipt || 'order_receipt', 
            customer_id: orderInput.customer_id 
          };
                    const order = await razorpayGlobalInstance.orders.create(orderData);
                    console.log(order)
                    const newOrder = await this.OrderModel.create({
                        userId: orderInput.userId,
                        eventId: orderInput.eventId,
                        amount: orderInput.amount,
                        currency: order.currency,
                        customerId: orderInput.customer_id,
                        orderId: order.id,
                        status: orderInput.status,
                        receipt: order.receipt,
                        amountPaid: order.amount_paid,
                        amount_due: order.amount_due,
                        isOrdered: true,
                        orderType: orderInput.orderType,
                        tournamentId: orderInput.tournamentId,
                        qrCode:generatedQRCode,
                        pickuplocation:orderInput.pickuplocation,
                    diliverLocation:orderInput.diliverLocation,
                        // Include other properties from orderInput and order as needed
                    });
    
                    response.push({ newOrder });
                }
             
        const productIdsToDelete = orderInput.productDetails?.map(product => product.id.toString()) ?? [];
            await this.CheckoutModel.findOneAndDelete({userId:orderInput.userId,"productDetails.id":{$in:productIdsToDelete}})
            await this.CartModel.deleteMany({userId:orderInput.userId,"productDetails.id":{$in:productIdsToDelete}})
            await this.TournamentModel.updateOne({_id:orderInput.tournamentId},{$inc: { totalEntriesLeft: -1 }})
            for (const product of orderInput.productDetails) {
              await this.productmodel.updateOne({ _id: product.id }, { $inc: { availability: -1 } });
          }
            return response;
    } catch (err) {
        throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
}
public async CancelOrder(orderId:string) {
  try {
    const orders = await this.OrderModel.findOne({_id:orderId,isOrdered:true})

    if (!orders) {
      console.log(`No Items found }`);
      throw new HttpException(404, 'No Items found');
    }
      const order = await this.OrderModel.findOneAndUpdate({_id:orderId,isOrdered:true},{$set:{isCancelled:true,isOrdered:false}},{new:true})
            await this.TournamentModel.updateOne({_id:order.tournamentId},{$inc: { totalEntriesLeft: 1 }})
    return order;
  } catch (err) {
    throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
  }
}
public async getCancelOrder(userId:string) {
  try {
    const CancelOrder = await this.OrderModel.find({userId:userId,isCancelled:true,isOrdered:false})

    if (!CancelOrder) {
      console.log(`No Items found }`);
      throw new HttpException(404, 'No Items found');
    }
    return CancelOrder;
  } catch (err) {
    throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
  }
}
public async getAllorders() {
  try {
    const order = await this.OrderModel.find({isOrdered:true})

    if (!order) {
      console.log(`No Items found }`);
      throw new HttpException(404, 'No Items found');
    }
    return order;
  } catch (err) {
    throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
  }
}
}
