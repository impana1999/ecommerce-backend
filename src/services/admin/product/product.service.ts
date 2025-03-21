import { HttpException } from '@exceptions/HttpException';
import { ProductModel, wishlistModel} from '@models/index';

//Author : Srinivas
//Creates new product and stores into "products" collection.
export default class ProductService {
  private productmodel = ProductModel;
  private wishlistModel=wishlistModel;

  public async createProduct(productInput) {
    try {
      const product = await (await this.productmodel.create(productInput)).save();
      return {product};
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get all products
  public async getAllProducts() {
    try {
      const allProducts = await this.productmodel.find();
  
      if (!allProducts) {
        throw new HttpException(400, 'No product found');
      }
  return allProducts
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
  public async getAllProductsbyid(userId: string) {
    try {
      const allProducts = await this.productmodel.find();
  
      if (!allProducts || allProducts.length === 0) {
        throw new HttpException(400, 'No products found');
      }
  
      const wishlistProducts = await this.wishlistModel.find({
        "productDetails.id": { $in: allProducts.map(product => product._id) },
        "userId": userId
      });
      const wishlistProductIds = wishlistProducts.map(wishlistItem => wishlistItem.productDetails.id);
      const wishlistItemIdsMap = new Map(wishlistProducts.map(wishlistItem => [wishlistItem.productDetails.id, wishlistItem._id]));
      const productsWithWishlistStatus = allProducts.map(product => ({
        productData: product,
        isWishlist: wishlistProductIds.includes(product._id.toString()),
        wishlistId: wishlistItemIdsMap.get(product._id.toString()) || null 
      }));
  
      return { productsWithWishlistStatus };
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  
  
 //Get  all prodcuts by name,id and price
  public async getAllProductsShort() {
    try {
      const product = await this.productmodel.find({}, '_id name price');
      if (!product) {
        throw new HttpException(400, 'No product found');
      }
      return product;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get  Single product by Id
  public async getSingleProductById(productId: string) {
    try {
      const product = await this.productmodel.findOne({ _id: productId });
      if (!product) {
        throw new HttpException(404, 'Product not found');
      }
      return product;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Remove product by Id
  public async RemoveProductById(productId: string) {
    try {
      const product = await this.productmodel.findById(productId);
      if (!product) {
        throw new HttpException(404, 'Product not found');
      }
      await this.productmodel.findByIdAndRemove(productId);
      const response = {
        message: 'product data removed successfully from database',
      };
      return response;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  // Updated the product  by using productId
  public async updateProductById(productId: string, updatedProductData: any) {
    try {
      const product = await this.productmodel.findById(productId);

      if (!product) {
        throw new HttpException(400, 'Product not found');
      } else {
        if (updatedProductData.name) {
          product.name = updatedProductData.name;
        }
        if (updatedProductData.imageUrl) {
          product.imageUrl = updatedProductData.imageUrl;
        }
        if (updatedProductData.description) {
          product.description = updatedProductData.description;
        }
        if (updatedProductData.price) {
          product.price = updatedProductData.price;
        }
        if (updatedProductData.daysToReturn) {
          product.daysToReturn = updatedProductData.daysToReturn;
        }
        if (updatedProductData.availability) {
          product.availability = updatedProductData.availability;
        }
        if (updatedProductData.features) {
          product.features = updatedProductData.features;
        }
        if (updatedProductData.subCategories) {
          product.subCategories = updatedProductData.subCategories;
        }

        const updatedProduct = await product.save();
        return updatedProduct;
      }
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get all products by sub-category Id
  public async getAllProductsBySubcategoryId(subCategoryId: string) {
    try {
      const products = await this.productmodel.find({ "subCategories.id": subCategoryId });
      if (!products) {
        throw new HttpException(400, 'No products found');
      }
      return products;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }

  //Get  all prodcuts short by sub-category Id
  public async getAllProductsShortBySubCategoryId(productInput) {
    try {
      const allProducts = await this.productmodel.find({ "subCategories.id": productInput.subCategoryId }, '_id name price imageUrl');
      if (!allProducts) {
        throw new HttpException(400, 'No product found');
      }
      const wishlistProducts = await this.wishlistModel.find({ "productDetails.id": { $in: allProducts.map(product => product._id) },"userId":productInput.userId });
      const wishlistProductIds = wishlistProducts.map(wishlistItem => wishlistItem.productDetails.id);
      const productsWithWishlistStatus = allProducts.map(product => ({
        ...product.toObject(),
        isWishlist: wishlistProductIds.includes(product._id.toString()) 
      }));
  
      return productsWithWishlistStatus;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
  public async getFeaterProduct() {
      const currentDate = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(currentDate.getDate() - 7);
      const recentProducts = await this.productmodel.find({
        createdAt: { $gte: oneWeekAgo, $lte: currentDate }
      });
      if (!recentProducts || recentProducts.length === 0) {
        throw new HttpException(400, 'No products found within the last week');
      }
  
      return recentProducts;
    } catch (err) {
      throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
    }
  }
