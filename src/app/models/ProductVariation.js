import Sequelize, { Model } from 'sequelize';

class ProductVariation extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        sku: Sequelize.STRING,
        available: Sequelize.STRING,
        variation_name: Sequelize.STRING,
        price: Sequelize.FLOAT,
        price_from: Sequelize.FLOAT,
        weight: Sequelize.INTEGER,
        order: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  }
}

export default ProductVariation;
