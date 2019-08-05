import Sequelize, { Model } from 'sequelize';

class Price extends Model {
  static init(sequelize) {
    super.init(
      {
        price: Sequelize.FLOAT,
        price_from: Sequelize.FLOAT,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.ProductVariation, {
      foreignKey: 'product_variation_id',
      as: 'product_variation',
    });
  }
}

export default Price;
