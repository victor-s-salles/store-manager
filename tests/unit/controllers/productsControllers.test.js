const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const { productService } = require('../../../src/services')
const { productModel } = require('../../../src/models')
const {productController} = require('../../../src/controllers')


const {listProductsMock, newProduct} = require('./mocks/product.controller.mock')

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

    it('Deve retornar status 404, caso tente apagar um produto inexistente', async function () {
    const res = {}
    const req = { params: { id: 99 }, body: {} }
    
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
    sinon
      .stub(productService, 'deleteProduct')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })
    
     await productController.deleteProduct(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'})
    
    })
    it('Deve retornar status 204 e nenhuma mensagem, caso tente apagar um produto', async function () {
    const res = {}
    const req = { params: { id: 1 }, body: {} }
    
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
    res.sendStatus = sinon.stub().returns(res)
    sinon
      .stub(productService, 'deleteProduct')
      .resolves({ type: null, message: '' })
    
      await productController.deleteProduct(req, res);
      
    expect(res.sendStatus).to.have.been.calledWith(204);
    
    })
  
    it('Deve retornar status 200, na busca de produtos por nome', async function () {
    const res = {}
    const req = { query: { q: 'Marte' }, body: {} }
    
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
    sinon
      .stub(productService, 'searchProducts')
      .resolves({ type: null, message: [listProductsMock[0]] })
    
     await productController.searchProducts(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([listProductsMock[0]])
    
    })
  
  it('Deve retornar status 201, ao inserir um novo produto', async function () {
    const res = {}
    const req = { body: { name: 'Produto Teste' } }
    
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
    sinon
      .stub(productService, 'insertProduct')
      .resolves({ type: null, message: newProduct })
    
    await productController.insertProduct(req, res);
    
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct)
  })
    it('Deve retornar status 404, caso tente atualizar um produto inexistente', async function () {
    const res = {}
    const req = { params: { id: 99 }, body: {} }
    
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
    sinon
      .stub(productService, 'updateProduct')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })
    
     await productController.updateProduct(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'})
    
    })
  
    it('Deve retornar status 200, caso tente atualizar um produto', async function () {
    const res = {}
    const req = { params: { id: 4 }, body: { name: "Teste"} }
    
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
    sinon
      .stub(productService, 'updateProduct')
      .resolves({ type: null, message: newProduct })
    
     await productController.updateProduct(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newProduct)
    
    })

    afterEach(function () {
    sinon.restore();
  });
})