const express = require('express');
const router = express.Router();

const financialExpensesController = require('../controllers/financialExpenses.controller');
const financialValidator = require('../validators/financialIncome.validator');

router
    .post('/', financialValidator.postFinancialIncome(), financialExpensesController.postFinancialExpenses)
    .post('/many', financialExpensesController.postManyFinancialExpenses)

    .get('/', financialExpensesController.getFinancialExpenses)
    .get('/:id', financialExpensesController.getFinancialExpensesById)

    .put('/:id', financialValidator.postFinancialIncome(), financialExpensesController.putFinancialExpenses)

    .delete('/:id', financialExpensesController.deleteFinancialExpenses)
    .delete('/', financialExpensesController.destroyFinancialIncome)

module.exports = router;
