const chai = require('chai')
const chaiHttp = require('chai-http')
const data = require('../helpers/financialExpenses.json')
const getEnvString = require('../../helpers/get-env-string')
const schema = require('../helpers/schema')
const Joi = require('joi');

chai.use(chaiHttp);
const expect = chai.expect;

const request = chai.request(getEnvString('BASE_URL'));

const financial = [
    { "descricao": "Primeiro Curso", "valor": 152.22, "mes": "Novembro" },
    { "descricao": "Segundo Curso", "valor": 152.22, "mes": "Novembro" },
    { "descricao": "Terceiro Curso", "valor": 152.22, "mes": "Novembro" }
]

financial.forEach(element => {
    describe('Despesa - Salvar várias despesas', () => {
        context('Quando informo os dados de muitas despesas', () => {
            it('Então todas são salvas no banco', (done) => {
                request
                    .post(getEnvString('FINANCIAL_INCOME'))
                    .send(element)
                    .end((err, res) => {
                        expect(res).to.has.status(201)
                        Joi.assert(res.body, schema.postFinancialExpenses)
                        done();
                    })
            })
        })
    })
})

    describe('Pesquisar todas receitas salvas no banco', () => {
        context('Quando realizo o GET em receitas', () => {
            it('Então é retornado um array com as receitas salvas', (done) => {
                request
                    .get(getEnvString('FINANCIAL_INCOME'))
                    .end((err, res) => {
                        expect(res).to.has.status(200)
                        expect(res.body).to.be.an('array')
                        expect(res.body).to.have.lengthOf(3)
                        done()
                    })
            })
        })
    })

    after((done) => {
        request
            .delete(getEnvString('FINANCIAL_INCOME'))
            .end((err, res) => {
                expect(res).to.has.status(200)
                expect(res.body.message).to.equals("Successfully deleted information")
                done()
            })
    });

