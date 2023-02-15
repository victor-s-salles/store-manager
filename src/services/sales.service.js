const { salesModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  
  const sales = await salesModel.findById(id);

  if (sales.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

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

const deleteSale = async (id) => {
  const error = schema.validateId(id);

  if (error.type) return error;

  const rows = await salesModel.deleteSale(id);

  if (Number(rows) === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: '' };
};

const finalUpdateSale = async (id, arraySales, originalSales) => {
  if (Array.isArray(arraySales)) {
    arraySales.forEach(async (sale) => {
      await salesModel.insertNewSale(id, sale);
    });
  }
  const finalSale = {
    saleId: id,
    itemsUpdated: originalSales,
  };
   return { type: null, message: finalSale };
};

const updateSale = async (id, sales) => {
    let arraySales = sales;
  if (!Array.isArray(sales)) { 
    arraySales = [arraySales];
  }

  let error = schema.validateId(id);
  if (error.type) return error;
   error = await schema.validateSales(arraySales);
  if (error.type) return error;

  const rows = await salesModel.deleteSale(id);

  if (Number(rows) === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  await salesModel.insertUpdateSale(id);

  const result = await finalUpdateSale(id, sales, sales);

  return result;
};
module.exports = {
  findAll,
  insertNewSale,
  findById,
  deleteSale,
  updateSale,
};