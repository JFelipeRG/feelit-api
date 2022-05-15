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
      posts.belongsTo(models.usuarios,
        {
          as: 'fk_usuario',
          foreignKey: 'usuario',
        }
      );
      posts.belongsTo(models.canciones,
        {
          as: 'fk_cancion',
          foreignKey: 'cancion',
        }
      );
    }
  }
  posts.init({
    usuario: DataTypes.INTEGER,
    contenido: DataTypes.STRING,
    cancion: DataTypes.INTEGER,
    fecha_post: {
      type: DataTypes.DATE,
      get: function() {
        return this.getDataValue('fecha_post' )
          .toLocaleString('en-GB', { timeZone: 'UTC' });
      },}
  }, {
    timestamps: false,
    sequelize,
    modelName: 'posts',
  });
  return posts;
};