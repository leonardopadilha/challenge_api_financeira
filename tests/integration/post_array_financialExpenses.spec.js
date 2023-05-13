const chai = require('chai')
const chaiHttp = require('chai-http')
const data = require('../helpers/financialExpenses.json')
const getEnvString = require('../../helpers/get-env-string')
const schema = require('../helpers/schema')
const Joi = require('joi');

chai.use(chaiHttp);
const expect = chai.expect;

const request = chai.request(getEnvString('BASE_URL'));

const finance = [
    { "descricao": "Curso III", "valor": 152.22, "mes": "Novembro" },
    { "descricao": "Curso II", "valor": 152.22, "mes": "Novembro" }
]

describe ('Salvar todas as depesas de uma vez do array', () => {
    context('Quando informo todas as informações de um array de despesas', () => {
        it ('Então todas as informações são salvas corretamente', (done) => {
            request
            .post(getEnvString('FINANCIAL_EXPENSES') + 'many')
            .send(finance)
            .end((err, res) => {
                expect(res).to.has.status(201)
                expect(res.body).to.an('array')
                expect(res.body).to.lengthOf(2)
                done()
            })
        })
    })
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