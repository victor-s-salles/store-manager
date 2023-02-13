const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const getProducts = async () => {
  const products = await productModel.findAll();

  return { type: null, message: products };
};

const getProductsById = async (productId) => {
  const error = schema.validateId(productId);

  if (error.type) return error;

  const product = await productModel.findById(productId);

  if (!product) return { type: 'PASSENGER_NOT_FOUND', message: 'Product not found' };

   return { type: null, message: product };
};

const insertProduct = async (productName) => {
  // const error 

  const newProductId = await productModel.insertProduct(productName);
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  getProducts,
  getProductsById,
  insertProduct,
};