module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'andress_id', {
      type: Sequelize.INTEGER,
      references: { model: 'andresses', key: 'id' },
      onUpdate: 'CASCADE',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'andress_id');
  },
};
