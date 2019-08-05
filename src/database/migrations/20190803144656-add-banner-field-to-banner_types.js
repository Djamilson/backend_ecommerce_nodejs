module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('banners', 'banner_type_id', {
      type: Sequelize.INTEGER,
      references: { model: 'banner_types', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('banners', 'banner_type_id');
  },
};
