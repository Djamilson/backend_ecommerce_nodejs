import Sequelize, { Model } from 'sequelize';

class Banner extends Model {
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
    this.belongsTo(models.BannerTypes, {
      foreignKey: 'banner_type_id',
      as: 'banner_type',
    });
  }
}

export default Banner;
