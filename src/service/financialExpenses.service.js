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

    let financial;
    let finance = [];

    for (let i = 0; i < financialExpenses.length; i++) {
        const descriptionExists = await financialExpensesRepository.getFinancialExpensesByWhere({ descricao: financialExpenses[i].descricao })
        const monthExists = await financialExpensesRepository.getFinancialExpensesByWhere({ mes: financialExpenses[i].mes });

        if (descriptionExists && monthExists) {
            return createError(409, 'Sorry, finance income already exists')
        } else {
            financial = await financialExpensesRepository.postFinancialExpenses(financialExpenses[i])
            finance.push(financial)
        }
    }
    return finance;
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

const getFinancialExpensesById = async function(id) {
    const financialExpenses = await financialExpensesRepository.getFinancialExpensesById(id)

    if (!financialExpenses) {
        return createError(404, `Sorry, id ${id} not found`) 
    }

    return financialExpenses;
}

const deleteFinancialExpenses = async function(id) {
    const financialExpenses = await financialExpensesRepository.getFinancialExpensesById(id);

    if (!financialExpenses) {
        return createError(404, `Sorry, id ${id} not found`) 
    }

    await financialExpensesRepository.deleteFinancialExpenses(id);
    return financialExpenses;
}

const destroyFinancialExpenses = async function() {
    await financialExpensesRepository.destroyFinancialExpenses();
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
    postManyFinancialExpenses: postManyFinancialExpenses,
    putFinancialExpenses: putFinancialExpenses,
    getFinancialExpenses: getFinancialExpenses,
    getFinancialExpensesById: getFinancialExpensesById,
    deleteFinancialExpenses: deleteFinancialExpenses,
    destroyFinancialExpenses: destroyFinancialExpenses
}