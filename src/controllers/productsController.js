const Product = require("../models/Product");

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

const addProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).send({ message: "Producto agregado", product });
};

module.exports = { getProducts, addProduct };
