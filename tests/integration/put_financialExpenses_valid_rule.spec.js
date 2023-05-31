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
    { "descricao": "Automacao", "valor": 152.22, "mes": "Novembro" },
    { "descricao": "Automacao API", "valor": 152.22, "mes": "Novembro" },
    { "descricao": "Automacao WEB", "valor": 152.22, "mes": "Novembro" }
]

let id_financial = "";

financial.forEach(element => {
    describe('Popular banco', () => {
       
        it('Salvar dados de despesa', (done) => {
            request
            .post(getEnvString('FINANCIAL_EXPENSES'))
            .send(element)
            .end((err, res) => {
                expect(res).to.has.status(201)
                Joi.assert(res.body, schema.postFinancialExpenses)
                done();
            })
        })
    })
})

describe('Evitar dados duplicados para o mesmo mês', () => {

    it('Validar que as informações foram salvas', (done) => {
        request
            .get(getEnvString('FINANCIAL_EXPENSES'))
            .end((err, res) => {
                expect(res).to.has.status(200)
                expect(res.body).to.an('array')

                id_financial = res.body[2].id
                done()
            })
    })

    it('Sistema deve exibir mensagem de duplicidade', (done) => {
        request
            .put(getEnvString('FINANCIAL_EXPENSES') + id_financial)
            .send(financial[0])
            .end((err, res) => {
                expect(res).to.has.status(409)
                expect(res.body).to.not.have.property('id')
                expect(res.body).to.contains("Sorry, finance income already exists")
                done()
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