'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('canciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      caratula: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      artista: {
        allowNull: false,
        type: Sequelize.STRING
      },
      veces_compartida: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      link_yt: {
        allowNull: false,
        type: Sequelize.STRING
      },
      link_spoty: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fecha_publicacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('current_timestamp()'),
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('canciones');
  }
};