module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('prices', 'product_variation_id', {
      type: Sequelize.INTEGER,
      references: { model: 'product_variations', key: 'id' },
      onUpdate: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('prices', 'product_variation_id');
  },
};
