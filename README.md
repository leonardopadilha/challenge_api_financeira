# Challenge API Financeira

API desenvolvida com base no [Challenge Alura](https://www.alura.com.br/challenges/back-end-2/semana-01-api-rest)

## Etiquetas

[![NODE](https://img.shields.io/badge/License-node-green.svg)](https://nodejs.org/en)
[![Sequelize](https://img.shields.io/badge/License-sequelize-green.svg)](https://sequelize.org/docs/v6/getting-started/)
[![MYSQL](https://img.shields.io/badge/license-mysql-blue.svg)](https://www.mysql.com/)
[![Trello](https://img.shields.io/badge/license-trello-blue.svg)](https://trello.com/)
[![Postman](https://img.shields.io/badge/license-postman-orange.svg)](https://www.postman.com/)
[![Express](https://img.shields.io/badge/license-express-green.svg)](https://expressjs.com/)
[![Mocha](https://img.shields.io/badge/license-mocha-red.svg)](https://mochajs.org/)
[![Chai](https://img.shields.io/badge/license-chai-red.svg)](https://www.chaijs.com/)
[![JoiSchema](https://img.shields.io/badge/license-JoiSchema-red.svg)](https://www.npmjs.com/package/joi)
[![Express Validator](https://img.shields.io/badge/license-express--validator-green.svg)](https://www.npmjs.com/package/express-validator)
[![HTTP Errors](https://img.shields.io/badge/license-http--errors-green.svg)](https://www.npmjs.com/package/http-errors)
[![JS](https://img.shields.io/badge/license-javascript-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
## Instalação

Instale a API com NPM

```bash
  npm install
```

## Execução

```bash
  npm start
```

## Execução dos testes de integração

```bash
  npm run tests
```

## Documentação da API

### Receitas
#### Retorna as receitas salvas 

```http
  GET /api/receitas
```

#### Retorna uma receita

```http
  GET /api/receitas/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`        | `int`      | **Obrigatório**. O ID do item que você quer |

#### Adicionar uma receita
##### A API não deve permitir o cadastro de receitas duplicadas(contendo a mesma descrição, dentro do mesmo mês)

```http
  POST /api/receitas
```

| Parâmetro   | Tipo       | Descrição                                              |
| :---------- | :--------- | :----------------------------------------------------- |
| `descricao` | `string`   | **Obrigatório**. A descrição da receita que será salva |
| `valor`     | `float`    | **Obrigatório**. Valor da receita                      |
| `mes`       | `string`   | **Obrigatório**. Mês de referência                     |

#### Adicionar várias receitas
##### A API não deve permitir o cadastro de receitas duplicadas(contendo a mesma descrição, dentro do mesmo mês)

```http
  POST /api/receitas/many
```

| Parâmetro   | Tipo       | Descrição                                              |
| :---------- | :--------- | :----------------------------------------------------- |
| `descricao` | `string`   | **Obrigatório**. A descrição da receita que será salva |
| `valor`     | `float`    | **Obrigatório**. Valor da receita                      |
| `mes`       | `string`   | **Obrigatório**. Mês de referência                     |

#### Deleta uma receita

```http
  GET /api/receitas/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`        | `int`      | **Obrigatório**. O ID do item que você quer |

#### Deleta todas as receita (truncate)

```http
  GET /api/receitas
```

### Despesas
#### Retorna as despesas salvas 

```http
  GET /api/receitas
```

#### Retorna uma despesa

```http
  GET /api/receitas/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`        | `int`      | **Obrigatório**. O ID do item que você quer |

#### Adicionar uma despesa
##### A API não deve permitir o cadastro de depesas duplicadas(contendo a mesma descrição, dentro do mesmo mês)

```http
  POST /api/receitas
```

| Parâmetro   | Tipo       | Descrição                                              |
| :---------- | :--------- | :----------------------------------------------------- |
| `descricao` | `string`   | **Obrigatório**. A descrição da receita que será salva |
| `valor`     | `float`    | **Obrigatório**. Valor da receita                      |
| `mes`       | `string`   | **Obrigatório**. Mês de referência                     |

#### Adicionar várias despesas
##### A API não deve permitir o cadastro de depesas duplicadas(contendo a mesma descrição, dentro do mesmo mês)

```http
  POST /api/receitas/many
```

| Parâmetro   | Tipo       | Descrição                                              |
| :---------- | :--------- | :----------------------------------------------------- |
| `descricao` | `string`   | **Obrigatório**. A descrição da receita que será salva |
| `valor`     | `float`    | **Obrigatório**. Valor da receita                      |
| `mes`       | `string`   | **Obrigatório**. Mês de referência                     |

#### Deleta uma despesa

```http
  GET /api/receitas/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`        | `int`      | **Obrigatório**. O ID do item que você quer |

#### Deleta todas as despesas (truncate)

```http
  GET /api/receitas







