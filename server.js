require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const handle_404Error = require('./src/middlewares/handle-404Error');
const handleError = require('./src/middlewares/handleError');

const app = express();

const financialIncomeRoute = require('./src/routes/financialIncome.route');

app.use(bodyParser.urlencoded( { extended: true }));
app.use(bodyParser.json());

app.use('/api/receitas', financialIncomeRoute);

app.use(handle_404Error);
app.use(handleError);

app.listen(process.env.PORT, () => { console.log(`App listening on port ${process.env.PORT}`)});
