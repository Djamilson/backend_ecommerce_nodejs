import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.CategoryProduct, {
      through: 'category_products',
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

export default Product;
