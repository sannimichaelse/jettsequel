'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('variants', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    company_id: {
      allowNull: false,
      type: Sequelize.STRING(50),
    },
    handle: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    vendor: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    product_type: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    tags: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    sku: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('variants')
};
