const { salesModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const insertNewSale = async (sales) => {
  let arraySales = sales;
  if (!Array.isArray(sales)) { 
    arraySales = [arraySales];
  }

  const error = await schema.validateSales(arraySales);
  
  if (error.type) return error;
  const saleId = await salesModel.createNewSale();

  if (Array.isArray(arraySales)) {
    arraySales.forEach(async (sale) => {
      await salesModel.insertNewSale(saleId, sale);
    });
  }
  const finalSale = {
    id: saleId,
    itemsSold: sales,
  };
   return { type: null, message: finalSale };
};

const test = [
  {
    productId: 1,
    quantity: 1000,
  },
  {
    productId: 2,
    quantity: -5000,
  },
];

// const test2 = {
//     productId: 2,
//     quantity: -10,
//   };
insertNewSale(test);

module.exports = {
  findAll,
  insertNewSale,
};