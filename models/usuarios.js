'use strict';
const { TIMESTAMP } = require('mysql/lib/protocol/constants/types');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuarios.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nick: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    passw: {
      allowNull: false,
      type: DataTypes.STRING
    },
    profile_img: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};