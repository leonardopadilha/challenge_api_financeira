'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Despesas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Despesas.init({
    descricao: DataTypes.STRING,
    valor: DataTypes.DECIMAL(10, 2),
    mes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Despesa',
    tableName: 'despesas',
    paranoid: true
  });
  return Despesas;
};