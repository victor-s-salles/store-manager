const { idSchema } = require('./schemas');
const { productModel } = require('../../models');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const valideIndividualSale = (sale, allProductsIds) => {
if (!sale.productId) {
       return { type: 'MISSING_VALUE', message: '"productId" is required' };
     }
     if (sale.quantity === undefined) {
       return { type: 'MISSING_VALUE', message: '"quantity" is required' };
     }
     if (sale.quantity < 1) {
        return { type: 'OUTSIDE_VALUE', message: '"quantity" must be greater than or equal to 1' };
     }
     if (!allProductsIds.find((id) => id === sale.productId)) {
    return { type: 'NOTFOUND_PRODUCT', message: 'Product not found' };
     }
    return { type: null, message: '' };
};

const validateSales = async (sales) => {
  const allProducts = await productModel.findAll();
  const allProductsIds = allProducts.map((product) => product.id);
  let error = { type: null, message: '' };
   for (let index = 0; index < sales.length; index += 1) {
     const element = sales[index];
     error = valideIndividualSale(element, allProductsIds);
    if (error.type) { return error; }
   }
  return error;
};

module.exports = {
  validateId,
  validateSales,
};