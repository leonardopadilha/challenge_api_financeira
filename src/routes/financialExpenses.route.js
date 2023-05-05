const express = require('express');
const router = express.Router();

const financialExpensesController = require('../controllers/financialExpenses.controller');
const financialValidator = require('../validators/financialIncome.validator');

router
    .post('/', financialValidator.postFinancialIncome(), financialExpensesController.postFinancialExpenses)

    .get('/', financialExpensesController.getFinancialExpenses)

module.exports = router;
