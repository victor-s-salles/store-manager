const express = require('express');

const { productController } = require('../controllers');

const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get('/', productController.listProducts);

router.get('/:id', productController.listProductsById);

router.post('/', validateNewProductFields, productController.insertProduct);

router.put('/:id', validateNewProductFields, productController.updateProduct);

module.exports = router;