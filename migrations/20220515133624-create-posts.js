'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
     }
      },
      contenido: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cancion: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'canciones',
          key: 'id'
        }
      },
      fecha_post: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};