const newSale = {
    "productId": 1,
    "quantity": 10
}

const returnNewSale = {
  type: null,
  message: {
  "id": 3,
  "itemsSold": {
    "productId": 1,
    "quantity": 10
  }
  }
}

const responseNewSale = {
  "id": 3,
  "itemsSold": {
    "productId": 1,
    "quantity": 10
  }
}


module.exports = {
  newSale,
  returnNewSale,
  responseNewSale,
}