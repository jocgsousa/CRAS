import Sequelize, { Model } from 'sequelize';

class Endereco extends Model {
  static init(sequelize) {
    super.init({
      bairro: Sequelize.STRING,
      rua: Sequelize.STRING,
      cidade: Sequelize.STRING,
      estado: Sequelize.STRING,
      referencia: Sequelize.STRING,
      numero: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }
}
export default Endereco;
