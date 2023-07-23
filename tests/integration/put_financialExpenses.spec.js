const chai = require('chai')
const chaiHttp = require('chai-http')
const data = require('../helpers/financialExpenses.json')
const getEnvString = require('../../helpers/get-env-string')
const schema = require('../helpers/schema')
const Joi = require('joi');

chai.use(chaiHttp);
const expect = chai.expect;

const request = chai.request(getEnvString('BASE_URL'));

describe('Alterar Despesa', () => {

    let id_financial = "";

    const financial = {
        "descricao": "Teste",
        "valor": 52.35,
        "mes": "Dezembro"
    }

    context('Quando realizo a inclusão de uma despesa', () => {
        it ('Então essa despesa é incluída com sucesso', (done) => {
            request
                .post(getEnvString('FINANCIAL_EXPENSES'))
                .send(data.success)
                .end((err, res) => {
                    expect(res).to.has.status(201)
                    expect(res.body.descricao).to.equals(data.success.descricao)

                    id_financial = res.body.id;  
                    done()
        
                })
        })
    });

    context('Quando realizo a pesquisa da despesa salva', () => {
        it('Então a despesa retorna com sucesso ao realizar um GET', (done) => {
            request
                .get(getEnvString('FINANCIAL_EXPENSES') + `${id_financial}`)
                .end((err, res) => {
                    expect(res).to.has.status(200)
                    expect(res.body.id).to.equal(id_financial)
                    expect(res.body.descricao).to.equals(data.success.descricao)
                    done()
                })
        })
    })

    context('Quando realizo a alteração da despesa salva', () => {
        it('Então a despesa é altarada corretamente', (done) => {
            request
                .put(getEnvString(`FINANCIAL_EXPENSES`) + `${id_financial}`)
                .send(financial)
                .end((err, res) => {
                    expect(res).to.has.status(200)
                    expect(res.body.descricao).to.equals(financial.descricao)
                    expect(res.body.valor).to.contains(financial.valor)
                    expect(res.body.mes).to.equals(financial.mes)
                    Joi.assert(res.body, schema.putFinancialExpenses)
                    done()
                })
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

