import Sequelize, { Model } from 'sequelize';

class BannerTypes extends Model {
  static init(sequelize) {
    super.init(
      {
        banner_types: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default BannerTypes;
