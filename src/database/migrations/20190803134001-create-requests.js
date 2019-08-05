module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('requests', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      dateDelivery: { allowNull: false, type: Sequelize.DATE },

      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      iscount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      anddress: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },

      description: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('requests');
  },
};
