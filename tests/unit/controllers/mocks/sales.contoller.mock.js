const newSale = {
    "productId": 1,
    "quantity": 10
}

 const finalSale = {
    saleId: 2,
    itemsUpdated: newSale,
  };

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

const allSales = 
  {
  type: null,
  message: [
    {
      saleId: 1,
      date: '2023-02-15T23:44:53.000Z',
      productId: 1,
      quantity: 5
    },
    {
      saleId: 1,
      date: '2023-02-15T23:44:53.000Z',
      productId: 2,
      quantity: 10
    },
    {
      saleId: 2,
      date: '2023-02-15T23:44:53.000Z',
      productId: 3,
      quantity: 15
    }
  ]
}

const saleById = {
  type: null,
  message: [ { date: '2023-02-15T23:44:53.000Z', productId: 3, quantity: 15 } ]
}




module.exports = {
  newSale,
  returnNewSale,
  responseNewSale,
  allSales,
  saleById,
  finalSale,
}