import Sequelize, { Model } from 'sequelize';

class Horarios extends Model {
  static init(sequelize) {
    super.init(
      {
        horario: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Horarios;
