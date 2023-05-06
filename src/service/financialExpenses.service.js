const financialExpensesRepository = require('../repository/financialExpenses.repository')
const createError = require('http-errors')

const postFinancialExpenses = async function(financialExpenses) {
    const descriptionExists = await returnDescription(financialExpenses);
    const monthExists = await returnMonth(financialExpenses);

    if (descriptionExists && monthExists) {
        return createError(409, 'Sorry, finance income already exists')
    }

    const createFinancialExpenses = await financialExpensesRepository.postFinancialExpenses(financialExpenses);
    return createFinancialExpenses;
}

const postManyFinancialExpenses = async function(financialExpenses) {

}

const putFinancialExpenses = async function(financialExpenses, id) {
    const existsFinancial = await financialExpensesRepository.getFinancialExpensesById(id);

    if (!existsFinancial) {
        return createError(404, `Sorry, id ${id} not found`) 
    }

    const descriptionExists = await returnDescription(financialExpenses);
    const monthExists = await returnMonth(financialExpenses);

    if (descriptionExists && monthExists) {
        return createError(409, 'Sorry, finance income already exists')
    }

    const updateFinancialExpenses = await financialExpensesRepository.putFinancialExpenses(financialExpenses, id);
    return await financialExpensesRepository.getFinancialExpensesById(id);
}

const getFinancialExpenses = async function() {
    const financialExpenses = await financialExpensesRepository.getFinancialExpenses();

    if (financialExpenses.length == 0) {
        return createError(400, "Sorry, we couldn't find any records for this search.") 
    }

    return financialExpenses;
}

const returnDescription = async function(description) {
    const existsFinancialExpenses = await financialExpensesRepository.getFinancialExpensesByWhere({ descricao: description.descricao })
    return existsFinancialExpenses;
}

const returnMonth = async function(month) {
    const monthExists = await financialExpensesRepository.getFinancialExpensesByWhere({ mes: month.mes });
    return monthExists;
}

module.exports = {
    postFinancialExpenses: postFinancialExpenses,
    putFinancialExpenses: putFinancialExpenses,
    getFinancialExpenses: getFinancialExpenses
}