const { expect } = require('chai')
const sinon = require('sinon')

const { salesService } = require('../../../src/services')
const { salesModel, productModel } = require('../../../src/models')


// const connection = require('../../../src/models/connection')

const { allSales, newSale, returnNewSale, allProducts } = require('./mocks/sales.service.mock')

describe('Verificando o service dos sales', function () { 
  it('Testa buscar todas as vendas', async function () {
    sinon.stub(salesModel, 'findAll').resolves(allSales.message)

    const result = await salesService.findAll()

    expect(result).to.be.deep.equal(allSales)
  })

  it('Testa a inserção de uma nova venda', async function () {
    sinon.stub(salesModel, 'createNewSale').resolves(3)
    sinon.stub(productModel, 'findAll').resolves(allProducts)
    sinon.stub(salesModel, 'insertNewSale').resolves(0)

    const result = await salesService.insertNewSale(newSale)

    expect(result.message).to.be.deep.equal(returnNewSale)

  })
  afterEach(function () {
    sinon.restore();
  });
})
