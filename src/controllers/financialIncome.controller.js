const financialIncomeService = require('../service/financialIncome.service')
const { validationResult } = require('express-validator');
const createError = require('http-errors');

const postFinancialIncome = async function(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw createError(422, { errors: errors.array() })
        }

        const response = await financialIncomeService.postFinancialIncome(req.body);
        res.send(response);
    } catch (error) {
        return next(error)
    }
}

const getFinancialIncome = async function(req, res, next) {
    try {
        const response = await financialIncomeService.getFinancialIncome();

        if (response && response.message) {
            throw response;
        }

        res.send(response);
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    postFinancialIncome: postFinancialIncome,
    getFinancialIncome: getFinancialIncome
}