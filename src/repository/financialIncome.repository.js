const { Receita, sequelize } = require('../database/models');
const { QueryTypes } = require('sequelize');

const postFinancialIncome = async function(financialValues) {
    const financialIncome = await Receita.create(financialValues);
    return financialIncome;
};

const postManyFinancialIncome = async function(financialValues) {
    const financialIncome = await Receita.bulkCreate(financialValues);
    return financialIncome;
};

const putFinancialIncome = async function(financialValues, id) {
    await Receita.update(financialValues, {
        where : {
            id: id
        }
    })
}

const getFinancialIncome = async function() {
    const financialIncome = await Receita.findAll({
        attributes: [
            'id', 'descricao', 'valor', 'mes'
        ]
    });
    return financialIncome;
};

const getFinancialIncomeById = async function(id) {
    const financialIncome = await Receita.findByPk(id, {
        attributes: [
            'id', 'descricao', 'valor', 'mes'
        ]
    });
    return financialIncome;
};

const getFinancialIncomeByWhere = async function(description) {
    const financialIncome = await Receita.findOne({ where: description });
    return financialIncome;
};

const getFinancialIncomeByQuery = async function(description) {
    const financial = Object.values(description);

    const financialIncome = await sequelize.query(
        'SELECT * FROM receitas WHERE descricao LIKE :description',
        {
            replacements: { description: `%${financial}%`},
            type: QueryTypes.SELECT
        }
    )

    return financialIncome;
};

const deleteFinancialIncome = async function(id) {
    await Receita.destroy({
        truncate: true,
        force: true
      }
    )
};

const destroyFinancialIncome = async function() {
    return await Receita.destroy({
        truncate: true,
        force: true
      })
};

module.exports = {
    postFinancialIncome: postFinancialIncome,
    postManyFinancialIncome: postManyFinancialIncome,
    putFinancialIncome: putFinancialIncome,
    getFinancialIncome: getFinancialIncome,
    getFinancialIncomeById: getFinancialIncomeById,
    getFinancialIncomeByQuery: getFinancialIncomeByQuery,
    getFinancialIncomeByWhere: getFinancialIncomeByWhere,
    deleteFinancialIncome: deleteFinancialIncome,
    destroyFinancialIncome: destroyFinancialIncome,
}