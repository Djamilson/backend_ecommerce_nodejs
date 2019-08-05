module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('product_images', 'product_variation_id', {
      type: Sequelize.INTEGER,
      references: { model: 'product_images', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn(
      'product_images',
      'product_variation_id'
    );
  },
};
