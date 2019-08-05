import Sequelize, { Model } from 'sequelize';

class ProductVariation extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        sku: Sequelize.STRING,
        available: Sequelize.STRING,
        variation_name: Sequelize.STRING,
        weight: Sequelize.INTEGER,
        order: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    this.belongsTo(models.Price, { foreignKey: 'price_id', as: 'price' });
  }
}

export default ProductVariation;
