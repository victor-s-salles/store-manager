const express = require('express');

const { salesControlller } = require('../controllers');

// const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.post('/', salesControlller.insertNewSale);

router.get('/', salesControlller.getAllSales);

router.get('/:id', salesControlller.getSaleById);

router.delete('/:id', salesControlller.deleteSale);

router.put('/:id', salesControlller.updateSale);

module.exports = router;