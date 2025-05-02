import ProductModel from '../models/product.model.js';

class ProductDAO {
  async createProduct(productData) {
    return await ProductModel.create(productData);
  }

  async getProductById(productId) {
    return await ProductModel.findById(productId);
  }

  async getAllProducts() {
    return await ProductModel.find();
  }

  async updateProduct(productId, updateData) {
    return await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
  }

  async deleteProduct(productId) {
    return await ProductModel.findByIdAndDelete(productId);
  }
}

export default new ProductDAO();
