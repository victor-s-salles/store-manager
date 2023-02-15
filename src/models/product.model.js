const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const insertProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product],
  );

  return insertId;
};

const updateProduct = async (id, name) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE (id = ?)', [name, id],
  );
  return affectedRows;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE (id = ?)', [id],
  );
  return affectedRows;
};
module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProduct,
  deleteProduct,
};