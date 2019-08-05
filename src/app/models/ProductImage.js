import Sequelize, { Model } from 'sequelize';

class ProductImage extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/images/${this.path}`;
          },
        },
        order: Sequelize.INTEGER,
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

export default ProductImage;
