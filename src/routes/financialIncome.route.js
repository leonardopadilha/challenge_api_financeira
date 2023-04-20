const express = require('express');
const router = express.Router();

const financialIncomeController = require('../controllers/financialIncome.controller');

router
    .post('/', financialIncomeController.postFinancialIncome)
    .get('/', financialIncomeController.getFinancialIncome)

module.exports = router;