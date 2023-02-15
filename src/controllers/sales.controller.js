const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const insertNewSale = async (req, res) => {
  const { body } = req;

  const { type, message } = await salesService.insertNewSale(body);

  if (type) { return res.status(errorMap.mapError(type)).json({ message }); }

  return res.status(201).json(message);
};

const getAllSales = async (req, res) => {
  const { type, message } = await salesService.findAll();
  
  if (type) { return res.status(errorMap.mapError(type)).json({ message }); }

  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(Number(id));

  if (type) { return res.status(errorMap.mapError(type)).json({ message }); }

  return res.status(200).json(message);
};
const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.deleteSale(id);
  
   if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.sendStatus(204);
};

const updateSale = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const { type, message } = await salesService.updateSale(id, body);

  if (type) { return res.status(errorMap.mapError(type)).json({ message }); }

  return res.status(200).json(message);
};
module.exports = {
  insertNewSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};