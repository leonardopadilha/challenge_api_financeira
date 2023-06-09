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
        res.status(201).send(response);
    } catch (error) {
        return next(error)
    }
}

const postManyFinancialExpenses = async function(req, res, next) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw createError(422, { errors: errors.array() })
        }

        const response = await financialExpensesService.postManyFinancialExpenses(req.body);

        if (response && response.message) {
            throw response;
        }

        res.status(201).send(response)
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

const getFinancialExpensesById = async function(req, res, next) {
    try {
        const response = await financialExpensesService.getFinancialExpensesById(req.params.id);

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

        if (response && response.message) {
            throw response;
        }

        res.send(response)
    } catch (error) {
        return next(error)
    }
}

const deleteFinancialExpenses = async function(req, res, next) {
    try {
        const response = await financialExpensesService.deleteFinancialExpenses(req.params.id);

        if (response && response.message) {
            throw response;
        }

        res.send(response)
    } catch (error) {
        return next(error)
    }
}

const destroyFinancialIncome = async function(req, res, next) {
    try {
        await financialExpensesService.destroyFinancialExpenses()
        res.status(200).send({message: 'Successfully deleted information'})
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    postFinancialExpenses: postFinancialExpenses,
    postManyFinancialExpenses: postManyFinancialExpenses,
    getFinancialExpenses: getFinancialExpenses,
    getFinancialExpensesById: getFinancialExpensesById,
    putFinancialExpenses: putFinancialExpenses,
    deleteFinancialExpenses: deleteFinancialExpenses,
    destroyFinancialIncome: destroyFinancialIncome
}