module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_variations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      available: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      variation_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      price: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      price_from: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      weight: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      order: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('product_variations');
  },
};
