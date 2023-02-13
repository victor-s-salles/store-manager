const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productService.getProducts();
  
  if (type) return res.status(errorMap.mapError(type));
  
  res.status(200).json(message);
};

const listProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getProductsById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.insertProduct(name);
  
  if (type) return res.status(errorMap.mapError(type).json({ message }));

  return res.status(201).json(message);
};

module.exports = {
  listProducts,
  listProductsById,
  insertProduct,
};