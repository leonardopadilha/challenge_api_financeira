const { Despesa, sequelize } = require('../database/models');
const { QueryTypes } = require('sequelize');

const postFinancialExpenses = async function(financialExpenses) {
    const financialExpenses = await Despesa.create(financialExpenses);
    return financialExpenses;
};

const postManyFinancialExpenses = async function(financialExpenses) {
    const financialExpenses = await Despesa.create(financialExpenses);
    return financialExpenses;
};

const putFinancialExpenses = async function(financialExpenses, id) {
    await Despesa.update(financialExpenses, {
        where: {
            id: id
        }
    })
};

const getFinancialExpenses = async function() {
    const financialExpenses = await Despesa.findAll();
    return financialExpenses;
};

const getFinancialExpensesById = async function(id) {
    const financialExpenses = await Despesa.findByPk(id);
    return financialExpenses;
};

const getFinancialExpensesByQuery = async function(description) {
    const financial = Object.values(financialExpenses);

    const financialExpenses = await sequelize.query(
        'SELECT * FROM despesas WHERE descricao LIKE :description',
        {
            replacements: { description: `%${financial}%` },
            type: QueryTypes.SELECT
        }
    )
    return financialExpenses;
};

const getFinancialExpensesByWhere = async function(financialExpenses) {
    const financialExpenses = await Despesa.findOne({ where: financialExpenses});
    return financialExpenses;
};

const deleteFinancialExpenses = async function(id) {
    return await Despesa.destroy({ 
        where: {
            id: id
        }
    })
};

const destroyFinancialExpenses = async function(id) {
    return await Despesa.destroy({
        where: {
            id: id
        },
        force: true
    })
} 

module.exports = {
    postFinancialExpenses,
    postManyFinancialExpenses,
    putFinancialExpenses,
    getFinancialExpenses,
    getFinancialExpensesById,
    getFinancialExpensesByQuery,
    getFinancialExpensesByWhere,
    deleteFinancialExpenses,
    destroyFinancialExpenses,
}