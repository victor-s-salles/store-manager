const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [allSales] = await connection.execute(
    `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sa
    ON sp.sale_id = sa.id;`,
  );

  return camelize(allSales);
};

const findById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT sa.date, sp.product_id, sp.quantity
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS sa
      ON sp.sale_id = sa.id
      WHERE sa.id = ?;`, [id],
  );
  return camelize(sale);
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

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE (id = ?)', [id],
  );
  return affectedRows;
};

const insertUpdateSale = async (id) => {
    await connection.execute(
    'INSERT INTO sales VALUE(?, (NOW()))',
    [id],
  );
};

module.exports = {
  insertNewSale,
  createNewSale,
  findAll,
  findById,
  deleteSale,
  insertUpdateSale,
};
