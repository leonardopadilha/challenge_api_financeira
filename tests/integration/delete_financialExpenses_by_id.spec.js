const chai = require('chai')
const chaiHttp = require('chai-http')
const data = require('../helpers/financialExpenses.json')
const getEnvString = require('../../helpers/get-env-string')
const schema = require('../helpers/schema')
const Joi = require('joi');

chai.use(chaiHttp);
const expect = chai.expect;

const request = chai.request(getEnvString('BASE_URL'));

describe('DELETE em despesas', () => {

    let id_financial = "";

    it('Quando incluo uma despesa para exclusão', (done) => {
        request
            .post(getEnvString('FINANCIAL_EXPENSES'))
            .send(data.success)
            .end((err, res) => {
                expect(res).to.has.status(201)
                id_financial = res.body.id;
                expect(res.body, schema.postFinancialExpenses)
                done()
            })
    })

    it('a despesa é excluída com sucesso', (done) => {
        request
            .delete(getEnvString('FINANCIAL_EXPENSES') + id_financial)
            .end((err, res) => {
                expect(res).to.has.status(200)
                expect(res.body).to.have.property('id')
                expect(res.body.descricao).to.equals(data.success.descricao)
                Joi.assert(res.body, schema.putFinancialExpenses)
                done()
            })
    });
})

after((done) => {
    request
        .delete(getEnvString('FINANCIAL_EXPENSES'))
        .end((err, res) => {
            expect(res).to.has.status(200)
            expect(res.body.message).to.equals("Successfully deleted information")
            done()
        })
});