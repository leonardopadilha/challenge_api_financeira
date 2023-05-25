const chai = require('chai')
const chaiHttp = require('chai-http')
const data = require('../helpers/financialExpenses.json')
const getEnvString = require('../../helpers/get-env-string')
const schema = require('../helpers/schema')
const Joi = require('joi');

chai.use(chaiHttp);
const expect = chai.expect;

const request = chai.request(getEnvString('BASE_URL'));

describe('Despesa - Teste de Contrato', () => {
    context('Quando informo os dados conforme contrato', () => {
        it('Então a despesa é salva no banco', (done) => {
            request
                .post(getEnvString('FINANCIAL_EXPENSES'))
                .send(data.success)
                .end((err, res) => {
                    expect(res).to.has.status(201)
                    Joi.assert(res.body, schema.postFinancialExpenses)
                    done();
                })
        })
    });

    after((done) => {
        request
            .delete(getEnvString('FINANCIAL_EXPENSES'))
            .end((err, res) => {
                expect(res).to.has.status(200)
                expect(res.body.message).to.equals("Successfully deleted information")
                done()
            })
    });
})
