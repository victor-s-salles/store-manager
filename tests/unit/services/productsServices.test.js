const { expect } = require('chai')
const sinon = require('sinon')

const { productService } = require('../../../src/services')
const { productModel } = require('../../../src/models')

const connection = require('../../../src/models/connection')

const {productList} = require('./mocks/product.service.mock')

describe('Verificando o service dos produtos', function () {
  it('busca a lista de produtos', async function () {
    sinon.stub(productModel, 'findAll').resolves(productList)

    const result = await productService.getProducts()

    expect(result.type).to.be.equal(null)
    expect(result.message).to.deep.equal(productList)
  })

  it('busca um produto pelo seu id', async function () {
    sinon.stub(productModel, 'findById').resolves(productList[0])
    
    const result = await productService.getProductsById(1)

    expect(result.type).to.be.equal(null)
    expect(result.message).to.be.deep.equal(productList[0])
  })
})