'use strict';

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
      type: DataTypes.STRING,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  },
  {
    timestamps: false,
    sequelize,
    modelName: 'usuarios',
    instanceMethods: {
      validPassword: (password) => {
       return bcrypt.compareSync(password, this.password);
      }
    }
  });
  return usuarios;
};