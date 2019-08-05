module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('product_variations', 'product_id', {
      type: Sequelize.INTEGER,
      references: { model: 'products', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('product_variations', 'product_id');
  },
};
