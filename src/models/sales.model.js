const connection = require('./connection');

const findAll = async () => {
  const [allSales] = await connection.execute(
    'SELECT * FROM sales',
  );
  return allSales;
};

const createNewSale = async () => {
   const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
   );
   return insertId;
};
const insertNewSale = async (id, sales) => {
  const [{ insertId }] = await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?,?,?)',
      [Number(id), sales.productId, sales.quantity],
  );
  return insertId;
};

module.exports = {
  insertNewSale,
  createNewSale,
  findAll,
};
