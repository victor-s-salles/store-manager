const listSales = [
   { id: 1, date: '2023-02-14T23:45:20.000Z' },
   { id: 2, date: '2023-02-14T23:45:20.000Z' }
]

const newSale = {
    "productId": 2,
    "quantity": 5
}
  
const saleForId = 
  [{ date: '2023-02-17T01:00:59.000Z', product_id: 3, quantity: 15 }]

const saleForIdCamelize = 
  [{ date: '2023-02-17T01:00:59.000Z', productId: 3, quantity: 15 }]

module.exports = {
  listSales,
  newSale,
  saleForId,
  saleForIdCamelize,
}
