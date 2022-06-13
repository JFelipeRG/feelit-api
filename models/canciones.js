'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class canciones extends Model {
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
    },
    fecha_publicacion: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'canciones',
  });
  return canciones;
};