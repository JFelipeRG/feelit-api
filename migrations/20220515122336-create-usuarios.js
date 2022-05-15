'use strict';

const { TIME, TIMESTAMP } = require("mysql/lib/protocol/constants/types");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nick: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      passw: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      profile_img: {
        type: Sequelize.STRING
      },
      fecha_creacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('current_timestamp()'),
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};