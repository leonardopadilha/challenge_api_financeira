const financialIncomeRepository = require('../repository/financialIncome.repository');
const createError = require('http-errors')

const postFinancialIncome = async function(financialValues) {

   const financialExists = await financialIncomeRepository.getFinancialIncomeByWhere({ descricao: financialValues.descricao })

    if (financialExists) {
        return createError(409, 'Sorry, finance income already exists')
    }

     const financialIncome = await financialIncomeRepository.postFinancialIncome(financialValues);

     console.log(`Receitas: ${financialIncome}`)
     return financialIncome;
}

module.exports = {
    postFinancialIncome: postFinancialIncome
}