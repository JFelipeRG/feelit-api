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
      usuario_id: {
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
      cancion_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'canciones',
          key: 'id'
        }
      },
      fecha_post: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('current_timestamp()'),
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};