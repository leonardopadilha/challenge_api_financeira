const Joi = require('joi');

const postFinancialExpenses = Joi.object({
    id: Joi.number()
           .required(),

    descricao: Joi.string()
                  .required(),

    valor: Joi.number()
              .required(),

    mes: Joi.string()
            .required(),

    updatedAt: Joi.date()
                  .required(),

    createdAt: Joi.date()
                  .required()
})

module.exports = {
    postFinancialExpenses
}