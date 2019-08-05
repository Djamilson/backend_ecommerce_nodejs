import Sequelize, { Model } from 'sequelize';

const crypto = require('crypto');

class Tokens extends Model {
  static init(sequelize) {
    super.init(
      {
        token: Sequelize.STRING,
        expires: Sequelize.DATE,
        status: Sequelize.BOOLEAN,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async token => {
      token.token = await crypto.randomBytes(16).toString('hex');
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Tokens;
