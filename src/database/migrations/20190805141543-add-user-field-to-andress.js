module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('andresses', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('andresses', 'user_id');
  },
};
