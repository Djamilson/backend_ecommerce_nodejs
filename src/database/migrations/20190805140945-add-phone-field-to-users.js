module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'phone_id', {
      type: Sequelize.INTEGER,
      references: { model: 'phones', key: 'id' },
      onUpdate: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'phone_id');
  },
};
