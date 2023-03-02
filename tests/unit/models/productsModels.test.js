const { expect } = require('chai')
const sinon = require('sinon')

const { productModel } = require('../../../src/models')

const connection = require('../../../src/models/connection')

const {products} = require('./mocks/products.model.mock')

describe('Testes de unidade do model dos produtos', function () {
  it('Buscando lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products])

    const result = await productModel.findAll();

    expect(result).to.be.deep.equal(products)
  })

  it('Buscando produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]])
    
    const result = await productModel.findById(1)

    expect(result).to.be.deep.equal(products[0])
  })
  it('A inserção de um produto no banco', async function () {
    sinon.stub(connection, 'execute').resolves(2)
    
    const result = await productModel.insertProduct("ProdutoX")

    expect(result).to.be.deep.equal(2)
  })
   it('A atualização de um produto no banco', async function () {
    sinon.stub(connection, 'execute').resolves(1)
    
    const result = await productModel.updateProduct(1,'Novo nome')

    expect(result).to.be.deep.equal(1)
   })
  
    it('A remoção de um produto no banco', async function () {
    sinon.stub(connection, 'execute').resolves(1)
    
    const result = await productModel.deleteProduct(1)

    expect(result).to.be.deep.equal(1)
  })
   afterEach(function () {
    sinon.restore();
  });
})