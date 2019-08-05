module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('andresses', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      logradouro: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      longititude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      zip_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      complement: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      number: {
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
    return queryInterface.dropTable('andresses');
  },
};
