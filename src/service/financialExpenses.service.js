const financialExpensesRepository = require('../repository/financialExpenses.repository')
const createError = require('http-errors')

const postFinancialExpenses = async function(financialExpenses) {
    const descriptionExists = await returnDescription(financialExpenses);
    const monthExists = await returnMonth(financialExpenses);

    console.log(`Descrição: ${descriptionExists} - Mês: ${monthExists}`)

    if (descriptionExists && monthExists) {
        return createError(409, 'Sorry, finance income already exists')
    }

    const createFinancialExpenses = await financialExpensesRepository.postFinancialExpenses(financialExpenses);
    return createFinancialExpenses;
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
    postFinancialExpenses: postFinancialExpenses
}