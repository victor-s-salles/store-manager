const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const { productService } = require('../../../src/services')
const { productModel } = require('../../../src/models')
const {productController} = require('../../../src/controllers')


const {listProductsMock} = require('./mocks/product.controller.mock')

describe('Testa de unidade da camada Controller dos produtos', function () {
  it('Deve retornar status 200 e a lista de produtos', async function () {
    const res = {}
    const req = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
    sinon
      .stub(productService, 'getProducts')
      .resolves({ type: null, message: listProductsMock })
    
    await productController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listProductsMock)

  })
  it('Deve retornar status 200 e um unico produto pelo ID', async function () {
    const res = {}
    const req = {params: { id: 1 }, body: { }}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
    sinon
      .stub(productService, 'getProductsById')
      .resolves({ type: null, message: listProductsMock[0] })
    
    await productController.listProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listProductsMock[0])
    
  })

  it('Deve retornar status 404 e uma mensagem de erro do produto não encontrado', async function () {
    const res = {}
    const req = { params: { id: 5 }, body: {} }
    
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
    sinon
      .stub(productService, 'getProductsById')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })
    
     await productController.listProductsById(req, res);
    
     expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'})
    
  })

    afterEach(function () {
    sinon.restore();
  });
})