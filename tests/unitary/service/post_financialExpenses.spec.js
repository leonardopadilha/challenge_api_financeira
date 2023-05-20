const chai = require('chai')
const financialExpensesService = require('../../../src/service/financialExpenses.service');
const objFinancial = require('../../../helpers/obj-course');

const expect = chai.expect;

describe('Suite', () => {
    describe('Cadastro de despesa', () => {
  
        it ('Então a despesa financeira deve ser cadastrada com sucesso', async function () {
           const financial = await financialExpensesService.postFinancialExpenses(objFinancial)
            expect(financial).to.contain(objFinancial)
        })

        it ('Então ao fazer o GET devem retornar os dados salvos no banco', async function () {
            const getFinancial = await financialExpensesService.getFinancialExpenses();
            
            const objSave = Object.values(getFinancial) 
            expect(objSave[0].descricao).to.equals('Curso de programacao I')
        })

        it ('Então a mesma despesa não pode ser salva no mesmo mês', async function () {
            const description = await financialExpensesService.postFinancialExpenses(objFinancial);
            expect(description.message).to.equals('Sorry, finance income already exists');
        })

        it ('Então os dados devem apagados do banco', async function () {
            await financialExpensesService.destroyFinancialExpenses()
            const returnFinancial = await financialExpensesService.getFinancialExpenses();
            
            const msg = Object.values(returnFinancial)
            expect(msg).to.contains("Sorry, we couldn't find any records for this search.")
        })
    })
})
