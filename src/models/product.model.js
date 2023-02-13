const connction = require('./connection');

const findAll = async () => {
  const [result] = connction.execute(
    'SELECT * FROM StoreManager.products;',
  );

  return result;
};

module.exports = {
  findAll,
};