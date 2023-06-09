const { expect } = require('chai')
const sinon = require('sinon')

const { productService } = require('../../../src/services')
const { productModel } = require('../../../src/models')

// const connection = require('../../../src/models/connection')

const {productList, productIdOne} = require('./mocks/product.service.mock')

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

  it('Testa se ao deletar um produto, retorna corretamente', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves(1)

    const result = await productService.deleteProduct(2)

    expect(result.type).to.be.equal(null)
    expect(result.message).to.be.equal('')
  })
   it('Testa se ao deletar um produto inexistente, retorna corretamente', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves(0)

    const result = await productService.deleteProduct(2)

    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND')
    expect(result.message).to.be.equal('Product not found')
   })
  
    it('Testa a atualização de produto inexistente', async function () {
    sinon.stub(productModel, 'updateProduct').resolves(0)

    const result = await productService.updateProduct(2)

    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND')
    expect(result.message).to.be.equal('Product not found')
    })
  
   
    it('Testa a atualização de produto inexistente', async function () {
    sinon.stub(productModel, 'updateProduct').resolves(1)
    sinon.stub(productModel, 'findById').resolves(productList[0])
      
    const result = await productService.updateProduct(1)

    expect(result.type).to.be.equal(null)
    expect(result.message).to.be.equal(productList[0])
    })
  
  it('Testa a busca de um produto por nome', async function () {
    sinon.stub(productModel, 'findAll').resolves(productList)
      
    const result = await productService.searchProducts('Marte')

    expect(result.type).to.be.equal(null)
    expect(result.message).to.be.deep.equal([productIdOne])
  })
    afterEach(function () {
    sinon.restore();
  });
})