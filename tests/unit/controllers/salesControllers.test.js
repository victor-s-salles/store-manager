const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const { salesService } = require('../../../src/services')
const { salesModel } = require('../../../src/models')
const { salesControlller } = require('../../../src/controllers')

const {newSale, returnNewSale, responseNewSale} = require('./mocks/sales.contoller.mock')


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
 })
