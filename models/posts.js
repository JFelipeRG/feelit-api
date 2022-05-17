'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      posts.belongsTo(models.usuarios, {
        as: 'usuario',
        foreignKey: 'usuario_id'
      });
      posts.belongsTo(models.canciones, {
        as: 'cancion',
        foreignKey: 'cancion_id'
      });
    }
  }
  posts.init({
    usuario_id: DataTypes.INTEGER,
    contenido: DataTypes.STRING,
    cancion_id: DataTypes.INTEGER,
    fecha_post: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      get: function() {
        return this.getDataValue('fecha_post')
          .toLocaleString();
      }
    }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'posts',
  });
  return posts;
};