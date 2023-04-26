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

const putFinancialIncome = async function(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw createError(422, { errors: errors.array() })
        }

        const response = await financialIncomeService.putFinancialIncome({
            descricao: req.body.descricao,
            valor: req.body.valor,
            mes: req.body.mes
        }, req.params.id);

        if (response && response.message) {
            throw response;
        }

        res.send(response);
    } catch (error) {
        return next(error);
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

const getFinancialIncomeById = async function(req, res, next) {
    try {
        const response = await financialIncomeService.getFinancialIncomeById(req.params.id);

        if (response && response.message) {
            throw response;
        }

        res.send(response)
    } catch (error) {
        return next(error)
    }
}

const getFinancialIncomeByQuery = async function(req, res, next) {
    try {
        const response = await financialIncomeService.getFinancialIncomeByQuery(req.query);
        
        if (response && response.message) {
            throw response;
        }

        res.send(response)
    } catch (error) {
        return next(error);
    }
}

const deleteFinancialIncome = async function(req, res, next) {
    try {
        const response = await financialIncomeService.deleteFinancialIncome(req.params.id);

        if (response && response.message) {
            throw response;
        }

        res.send(response);
    } catch (error) {
        return next(error)
    }
}

const destroyFinancialIncome = async function(req, res, next) {
    try {
        const response = await financialIncomeService.destroyFinancialIncome(req.params.id);

        if (response && response.message) {
            throw response;
        }

        res.send(response)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    postFinancialIncome: postFinancialIncome,
    putFinancialIncome: putFinancialIncome,
    getFinancialIncome: getFinancialIncome,
    getFinancialIncomeById: getFinancialIncomeById,
    getFinancialIncomeByQuery: getFinancialIncomeByQuery,
    deleteFinancialIncome: deleteFinancialIncome,
    destroyFinancialIncome: destroyFinancialIncome
}