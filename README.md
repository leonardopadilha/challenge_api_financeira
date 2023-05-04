# Challenge API Financeira

API desenvolvida com base no [Challenge Alura](https://www.alura.com.br/challenges/back-end-2/semana-01-api-rest)

## Etiquetas

[![NODE](https://img.shields.io/badge/License-node-green.svg)](https://nodejs.org/en)
[![Sequelize](https://img.shields.io/badge/License-sequelize-green.svg)](https://sequelize.org/docs/v6/getting-started/)
[![MYSQL](https://img.shields.io/badge/license-mysql-blue.svg)](https://www.mysql.com/)
[![Trello](https://img.shields.io/badge/license-trello-blue.svg)](https://trello.com/)
[![Postman](https://img.shields.io/badge/license-postman-orange.svg)](https://www.postman.com/)

## Instalação

Instale a API com NPM

```bash
  npm install
```

## Execução

```bash
  npm start
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
##### A API não deve permitir o cadastro de depesas duplicadas(contendo a mesma descrição, dentro do mesmo mês)

```http
  POST /api/receitas
```

| Parâmetro   | Tipo       | Descrição                                              |
| :---------- | :--------- | :----------------------------------------------------- |
| `descricao` | `string`   | **Obrigatório**. A descrição da receita que será salva |
| `valor`     | `float`    | **Obrigatório**. Valor da receita                      |
| `mes`       | `string`   | **Obrigatório**. Mês de referência                     |

#### Adicionar várias receitas
##### A API não deve permitir o cadastro de depesas duplicadas(contendo a mesma descrição, dentro do mesmo mês)

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





