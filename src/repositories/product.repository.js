import ProductDAO from '../daos/product.dao.js';

class ProductRepository {
  create(productData) {
    return ProductDAO.createProduct(productData);
  }

  findById(productId) {
    return ProductDAO.getProductById(productId);
  }

  findAll() {
    return ProductDAO.getAllProducts();
  }

  update(productId, updateData) {
    return ProductDAO.updateProduct(productId, updateData);
  }

  delete(productId) {
    return ProductDAO.deleteProduct(productId);
  }
}

export default new ProductRepository();
