module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('phones', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('phones', 'user_id');
  },
};
