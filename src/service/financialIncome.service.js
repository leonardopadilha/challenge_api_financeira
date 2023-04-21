const financialIncomeRepository = require('../repository/financialIncome.repository');
const createError = require('http-errors')

const postFinancialIncome = async function(financialValues) {

   const financialExists = await financialIncomeRepository.getFinancialIncomeByWhere({ descricao: financialValues.descricao })

    if (financialExists) {
        return createError(409, 'Sorry, finance income already exists')
    }

     const financialIncome = await financialIncomeRepository.postFinancialIncome(financialValues);

     return financialIncome;
}

const getFinancialIncome = async function() {
    const financialIncome = await financialIncomeRepository.getFinancialIncome();

    if (financialIncome.length == 0) {
        return createError(400, "Sorry, we couldn't find any records for this search.")    
    }
    
    return financialIncome;
}

const getFinancialIncomeById = async function(id) {
    const financialIncome = await financialIncomeRepository.getFinancialIncomeById(id);

    if (!financialIncome) {
        return createError(404, `Sorry, id ${id} not found`) 
    }

    return financialIncome;
}

module.exports = {
    postFinancialIncome: postFinancialIncome,
    getFinancialIncome: getFinancialIncome,
    getFinancialIncomeById: getFinancialIncomeById
}