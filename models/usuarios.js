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
      usuarios.hasMany(models.posts, {
        foreignKey: 'usuario_id',
        as:'posts'
      })
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
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      get: function() {
        return this.getDataValue('fecha_creacion')
          .toLocaleDateString();
      }
    }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};