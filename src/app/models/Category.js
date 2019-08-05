import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        category: Sequelize.STRING,
        description: Sequelize.TEXT,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.CategoryProduct, {
      through: 'category_product',
      foreignKey: 'product_id',
      as: 'product',
    });
  }
}

export default Category;
