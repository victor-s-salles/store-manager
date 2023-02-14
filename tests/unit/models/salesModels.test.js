const { expect } = require('chai')
const sinon = require('sinon')

const { salesModel } = require('../../../src/models')

const connection = require('../../../src/models/connection')

const {listSales, newSale} = require('./mocks/sales.model.mock')

describe('Testes de unidade do model dos sales', function () {
  it('Testa se retorna todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([listSales])

    const result = await salesModel.findAll()

    expect(result).to.be.deep.equal(listSales)
  })

  it('Testar a criação de uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    
    const result = await salesModel.createNewSale()

    expect(result).to.equal(1)

  })

  it('Testar a inserção de uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 0 }]);
    
    const result = await salesModel.insertNewSale(1, newSale)

    expect(result).to.equal(0)

  })

  afterEach(function () {
    sinon.restore();
  });
})