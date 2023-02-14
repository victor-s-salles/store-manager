const allSales = {
  type: null,
  message: [
     { id: 1, date: '2023-02-15T00:22:16.000Z' },
     { id: 2, date: '2023-02-15T00:22:16.000Z' }
  ]
}

const newSale = {
    "productId": 1,
    "quantity": 10
}
  
const returnNewSale = {
  "id": 3,
  "itemsSold": {
    "productId": 1,
    "quantity": 10
  }
}

const allProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' }
]

module.exports = {
  allSales,
  newSale,
  returnNewSale,
  allProducts,
}