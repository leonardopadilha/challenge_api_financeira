const { body, param } = require('express-validator');
const {validatorMessage } = require('../utils/errorMessage')

const postFinancialIncome = function() {
    return [
        body('descricao', validatorMessage('Descrição')).exists().bail().isString(),
        body('valor', validatorMessage('Valor')).exists().bail().isFloat(),
        body('mes', validatorMessage('Mês')).exists().bail().isString()
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