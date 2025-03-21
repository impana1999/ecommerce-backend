import { Router } from 'express';
import { ProductController } from '@controllers/admin/index';
import { Routes } from '@interfaces/index';
import { ProductDto, UpdateProductDto } from '@dtos/admin/index';
import { authMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class ProductRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/create-product', validationMiddleware(ProductDto, 'body'), authMiddleware, this.productController.productCreate);

    this.router.get(this.path + '/get-all-products', authMiddleware, this.productController.getallProducts);
    this.router.get(this.path + '/get-all-products/:userId', authMiddleware, this.productController.getAllProductsbyid);
    

    this.router.get(this.path + '/get-all-products-short', authMiddleware, this.productController.getallproductsShort);

    this.router.get(this.path + '/get-product/:productId', authMiddleware, this.productController.getSingleProductById);

    this.router.delete(this.path + '/delete-product/:productId', authMiddleware, this.productController.removeProductbyId);

    this.router.post(this.path + '/update-product/:productId', validationMiddleware(UpdateProductDto, 'body'), this.productController.updateProduct);

    this.router.get(this.path + '/get-all-product/:subCategoryId', authMiddleware, this.productController.getallProductsBySubacategoryId);

    this.router.post(this.path + '/get-all-products-short', authMiddleware, this.productController.getallproductsBySubacategoryIdShort);

    this.router.get(this.path + '/getFeaterProduct', authMiddleware, this.productController.getfeaterproduct)
  }
}

export default ProductRoute;
