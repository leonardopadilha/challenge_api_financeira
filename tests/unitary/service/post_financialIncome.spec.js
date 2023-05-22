const chai = require('chai');
const objFinancial = require('../../../helpers/obj-course');
const arrFinancial = require('../../../helpers/array-course')
const financialIncomeService = require('../../../src/service/financialIncome.service');

const expect = chai.expect;

describe('Suite', () => {
    describe('Cadastro de receitas', () => {
  
        it ('Então a despesa financeira deve ser cadastrada com sucesso', async function () {
           const financial = await financialIncomeService.postFinancialIncome(objFinancial)
            expect(financial).to.contain(objFinancial)
        })

        it ('Então ao fazer o GET devem retornar os dados salvos no banco', async function () {
            const getFinancial = await financialIncomeService.getFinancialIncome();
            
            const objSave = Object.values(getFinancial) 
            expect(objSave[0].descricao).to.equals('Curso de programacao I')
        })

        it ('Então a mesma receita não pode ser salva no mesmo mês', async function () {
            const description = await financialIncomeService.postFinancialIncome(objFinancial);
            expect(description.message).to.equals('Sorry, finance income already exists')
        })

        it ('Então deve salvar em um array uma receita duplicada', async function () {
            const array_financial = await financialIncomeService.postManyFinancialIncome(arrFinancial)
            expect(array_financial.message).to.contains('finance Curso de programacao I income already exists')
        })

        it ('Então os dados devem apagados do banco', async function () {
            await financialIncomeService.destroyFinancialIncome()
            const returnFinancial = await financialIncomeService.getFinancialIncome();
            
            const msg = Object.values(returnFinancial)
            expect(msg).to.contains("Sorry, we couldn't find any records for this search.")
        })
    })
})
