const { expect } = require('chai')
const sinon = require('sinon')

const { salesService } = require('../../../src/services')
const { salesModel, productModel } = require('../../../src/models')


// const connection = require('../../../src/models/connection')

const { allSales, newSale, returnNewSale, allProducts, oneSale } = require('./mocks/sales.service.mock')

describe('Verificando o service dos sales', function () { 
  it('Testa buscar todas as vendas', async function () {
    sinon.stub(salesModel, 'findAll').resolves(allSales.message)

    const result = await salesService.findAll()

    expect(result).to.be.deep.equal(allSales)
  })
    it('Testa busca de uma venda por id', async function () {
    sinon.stub(salesModel, 'findById').resolves(allSales.message[0])

    const result = await salesService.findById(1)

    expect(result).to.be.deep.equal(oneSale)
    })
  
    it('Testa busca de uma venda por id inexistente', async function () {
    sinon.stub(salesModel, 'findById').resolves([])

    const result = await salesService.findById(99)

    expect(result).to.be.deep.equal({ type: 'SALE_NOT_FOUND', message: 'Sale not found' })
    })
  
    it('Testa apagar uma sale inexistente', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves(0)

    const result = await salesService.deleteSale(99)

    expect(result).to.be.deep.equal({ type: 'SALE_NOT_FOUND', message: 'Sale not found' })
    })
  
   it('Testa apagar uma sale', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves(1)

    const result = await salesService.deleteSale(2)

    expect(result).to.be.deep.equal({ type: null, message: '' })
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
