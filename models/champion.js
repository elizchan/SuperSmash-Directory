'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class champion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.champion.belongsToMany(models.user, {through: 'userchampion'})
    }
  };
  champion.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    displayName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'champion',
  });
  return champion;
};