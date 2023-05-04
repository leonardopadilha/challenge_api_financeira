const { body, param } = require('express-validator');
const {validatorMessage } = require('../utils/errorMessage')

const postFinancialIncome = function() {
    return [
        body('descricao', validatorMessage('Descrição')).exists().notEmpty().bail().isString(),
        body('valor', validatorMessage('Valor')).exists().notEmpty().bail().isFloat(),
        body('mes', validatorMessage('Mês')).exists().notEmpty().bail().isString()
    ]
}

const getFinancialIncomeById = function() {
    return [
        param('id', validatorMessage('Id')).exists().bail().isInt()
    ]
}

module.exports = {
    postFinancialIncome: postFinancialIncome,
    getFinancialIncomeById: getFinancialIncomeById
}