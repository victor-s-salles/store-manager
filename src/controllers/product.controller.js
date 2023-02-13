const { productService } = require('../services');

const listProducts = async (_req, res) => {
  const { type, message } = await productService.getProducts();
  
  if (type) return res.status(404).json({ message: 'erro a configurar' });
  
  res.status(200).json(message);
};

module.exports = {
  listProducts,
};