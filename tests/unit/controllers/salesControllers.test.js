const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const { salesService } = require('../../../src/services')
const { salesModel } = require('../../../src/models')
const { salesControlller } = require('../../../src/controllers')

const {newSale, returnNewSale, responseNewSale, saleById, allSales} = require('./mocks/sales.contoller.mock')


describe('Testa de unidade da camada Controller dos sales', function () {
  it('Testa inserir uma nova venda', async function () {
    const req = { body:newSale }
    const res = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

    sinon.stub(salesService, 'insertNewSale')
      .resolves(returnNewSale)

    await salesControlller.insertNewSale(req, res)

     expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(responseNewSale)

  })
  
  it('Testa a buscar por todas as vendas', async function () {
     const req = {}
    const res = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

    sinon.stub(salesService, 'findAll')
      .resolves(allSales)
    
     await salesControlller.getAllSales(req, res)

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(allSales.message)


  })
  it('Testa a busca de venda por um id', async function () {
    const req = {params: 2}
    const res = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)

    sinon.stub(salesService, 'findById')
      .resolves(saleById)
    
     await salesControlller.getSaleById(req, res)

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(saleById.message)
  })
    afterEach(function () {
    sinon.restore();
  });
 })
