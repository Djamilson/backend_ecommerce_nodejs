module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('product_variations', 'price_id', {
      type: Sequelize.INTEGER,
      references: { model: 'prices', key: 'id' },
      onUpdate: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('product_variations', 'price_id');
  },
};
