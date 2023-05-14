const express = require('express');
const router = express.Router();

const financialIncomeController = require('../controllers/financialIncome.controller');
const financeialIncomeValidator = require('../validators/financialIncome.validator');

router
    .post('/', financeialIncomeValidator.postFinancialIncome(), financialIncomeController.postFinancialIncome)
    .post('/many', financialIncomeController.postManyFinancialIncome)

    .put('/:id', financeialIncomeValidator.postFinancialIncome(), financialIncomeController.putFinancialIncome)
    
    .get('/', financialIncomeController.getFinancialIncome)
    .get('/:id', financeialIncomeValidator.getFinancialIncomeById(), financialIncomeController.getFinancialIncomeById)
    .get('/buscar', financialIncomeController.getFinancialIncomeByQuery)
    
    .delete('/:id', financialIncomeController.deleteFinancialIncome)
    .delete('/', financialIncomeController.destroyFinancialIncome)


module.exports = router;