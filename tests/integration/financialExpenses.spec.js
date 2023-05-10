const chai = require('chai')
const chaiHttp = require('chai-http')
const data = require('../helpers/financialExpenses.json')
const getEnvString = require('../../helpers/get-env-string')

chai.use(chaiHttp);
const expect = chai.expect;

const request = chai.request(getEnvString('BASE_URL'));

describe('Despesa', () => {
    const financial = {
        "descricao": "Teste",
        "valor": 152.22,
        "mes": "Novembro"
    }

    let descricao;
    let valor;
    let mes;

    context('Quando incluo uma despesa pela primeira vez e informo os dados corretos', () => {
        it('Então a despesa é salva no banco corretamente', (done) => {
            request
                .post(getEnvString('FINANCIAL_EXPENSES'))
                .send(data.success)
                .end((err, res) => {
                    expect(res).to.has.status(201)
                    expect(res.body).to.have.property('descricao')
                    expect(res.body).to.have.property('valor')
                    expect(res.body).to.have.property('mes')

                    descricao = res.body.descricao
                    valor = res.body.valor
                    mes = res.body.mes

                    expect(descricao).to.not.be.null
                    expect(valor).to.not.be.null
                    expect(mes).to.not.be.null
                    done();
                })
        })
    });

    context('Quando incluo pela segunda a mesma despesa', () => {
        before((done) => {
            request
                .post(getEnvString('FINANCIAL_EXPENSES'))
                .send(financial)
                .end((err, res) => {
                    expect(res).to.has.status(201)
                    done()
                })
            })
                    
        it('Então a despesa não é salva no banco e o sistema retorna mensagem de erro referente a duplicidade', (done) => {
            request
                .post(getEnvString('FINANCIAL_EXPENSES'))
                .send(financial)
                .end((err, res) => {
                    expect(res).to.has.status(201)
                    expect(res.body.message).to.equals('Sorry, finance income already exists')
                    done()
                })
        })
    })

    context('Quando informo uma despesa sem o campo descricao', () => {
        it ('Então o sistema retorna mensagem de erro referente a obrigatoriedade do campo', (done) => {
            request
                .post(getEnvString('FINANCIAL_EXPENSES'))
                .send(data.unnamed)
                .end((err, res) => {
                    expect(res).to.has.status(422)
                    expect(res.body).to.contains("The property Descrição is invalid")
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
})
