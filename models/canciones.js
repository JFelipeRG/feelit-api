'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class canciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  canciones.init({
    caratula: {
      type: DataTypes.STRING
    },
    nombre: {
      type: DataTypes.STRING
    },
    artista: {
      type: DataTypes.STRING
    },
    veces_compartida: {
      type: DataTypes.INTEGER
    },
    link_yt: {
      type: DataTypes.STRING
    },
    link_spoty: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'canciones',
  });
  return canciones;
};