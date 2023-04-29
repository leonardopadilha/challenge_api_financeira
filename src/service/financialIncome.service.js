const financialIncomeRepository = require('../repository/financialIncome.repository');
const createError = require('http-errors')

const postFinancialIncome = async function(financialValues) {

    const descriptionExists = await returnDescription(financialValues);
    const mounthExists = await returnMonth(financialValues);

    if (descriptionExists && mounthExists) {
        return createError(409, 'Sorry, finance income already exists')
    }

     const financialIncome = await financialIncomeRepository.postFinancialIncome(financialValues);

     return financialIncome;
}

const postManyFinancialIncome = async function(financialValues) {

    let descriptionExists = "";
    let mounthExists = "";
    let finance = ""
    let arrayPayments = []

    for (let i = 0; i < financialValues.length; i++) {
        
        descriptionExists = await financialIncomeRepository.getFinancialIncomeByWhere({descricao: financialValues[i].descricao});
        mounthExists = await financialIncomeRepository.getFinancialIncomeByWhere({mes: financialValues[i].mes});

        if (descriptionExists && mounthExists) {
            return createError(409, `Sorry, finance ${financialValues[i].descricao} income already exists`)
        } else {
            finance = await financialIncomeRepository.postFinancialIncome(financialValues[i]);
            arrayPayments.push(finance)
        }
    }
    return arrayPayments
}

const putFinancialIncome = async function(financialValues, id) {
    const financialIncome = await financialIncomeRepository.getFinancialIncomeById(id);

    if (!financialIncome) {
        return createError(404, `Sorry, id ${id} not found`) 
    }

    const descriptionExists = await returnDescription(financialValues);
    const mounthExists = await returnMonth(financialValues);

    if (descriptionExists && mounthExists) {
        return createError(409, 'Sorry, finance income already exists')
    }

    await financialIncomeRepository.putFinancialIncome(financialValues, id);
    return await financialIncomeRepository.getFinancialIncomeById(id);
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

const returnDescription = async function (financialValues) {
    const descriptionExists = await financialIncomeRepository.getFinancialIncomeByWhere({ descricao: financialValues.descricao })
    return descriptionExists;
}

const returnMonth = async function(financialValues) {
    const monthExists = await financialIncomeRepository.getFinancialIncomeByWhere({ mes: financialValues.mes })
    return monthExists;
}

module.exports = {
    postFinancialIncome: postFinancialIncome,
    postManyFinancialIncome: postManyFinancialIncome,
    putFinancialIncome: putFinancialIncome,
    getFinancialIncome: getFinancialIncome,
    getFinancialIncomeById: getFinancialIncomeById,
    getFinancialIncomeByQuery: getFinancialIncomeByQuery,
    deleteFinancialIncome: deleteFinancialIncome,
    destroyFinancialIncome: destroyFinancialIncome
}