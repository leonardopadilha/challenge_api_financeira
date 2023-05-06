const financialExpensesService = require('../service/financialExpenses.service');
const { validationResult } = require('express-validator');
const createError = require('http-errors');

const postFinancialExpenses = async function(req, res, next) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw createError(422, { errors: errors.array() })
        }

        const response = await financialExpensesService.postFinancialExpenses(req.body);
        res.send(response);
    } catch (error) {
        return next(error)
    }
}

const getFinancialExpenses = async function(req, res, next) {
    try {
        const response = await financialExpensesService.getFinancialExpenses();

        if (response && response.message) {
            throw response;
        }

        res.send(response);
    } catch (error) {
        return next(error);
    }
}

const putFinancialExpenses = async function(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw createError(422, { errors: errors.array() })
        }

        const response = await financialExpensesService.putFinancialExpenses({
            descricao: req.body.descricao,
            valor: req.body.valor,
            mes: req.body.mes
        }, req.params.id)

        if (response && response.messa) {
            throw response;
        }

        res.send(response)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    postFinancialExpenses: postFinancialExpenses,
    getFinancialExpenses: getFinancialExpenses,
    putFinancialExpenses: putFinancialExpenses
}