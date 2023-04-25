const financialIncomeRepository = require('../repository/financialIncome.repository');
const createError = require('http-errors')

const postFinancialIncome = async function(financialValues) {

   const descriptionExists = await financialIncomeRepository.getFinancialIncomeByWhere({ descricao: financialValues.descricao })
   const mounthExists = await financialIncomeRepository.getFinancialIncomeByWhere({ mes: financialValues.mes })

    if (descriptionExists && mounthExists) {
        return createError(409, 'Sorry, finance income already exists')
    }

     const financialIncome = await financialIncomeRepository.postFinancialIncome(financialValues);

     return financialIncome;
}

const postManyFinancialIncome = async function(financialValues) {

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

const getFinancialIncomeByQuery = async function(financialValues) {
    const financialIncome = await financialIncomeRepository.getFinancialIncomeByQuery({ descricao: financialValues.descricao })

    if (financialIncome.length == 0) {
        return createError(400, "Sorry, we couldn't find any records for this search.") 
    }

    return financialIncome;
}

const deleteFinancialIncome = async function(id) {
    const financialIncome = await financialIncomeRepository.getFinancialIncomeById(id);

    if (!financialIncome) {
        return createError(404, `Sorry, id ${id} not found`) 
    }

    await financialIncomeRepository.deleteFinancialIncome(id);
    return financialIncome;

}

const destroyFinancialIncome = async function(id) {
    const financialIncome = await financialIncomeRepository.getFinancialIncomeById(id);

    if (!financialIncome) {
        return createError(404, `Sorry, id ${id} not found`)
    }

    await financialIncomeRepository.destroyFinancialIncome(id);
    return financialIncome;
}

module.exports = {
    postFinancialIncome: postFinancialIncome,
    getFinancialIncome: getFinancialIncome,
    getFinancialIncomeById: getFinancialIncomeById,
    getFinancialIncomeByQuery: getFinancialIncomeByQuery,
    deleteFinancialIncome: deleteFinancialIncome,
    destroyFinancialIncome: destroyFinancialIncome
}