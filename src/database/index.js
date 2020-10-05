import Sequelize from 'sequelize';
import DatabaseConfig from '../config/database';

import User from '../app/models/User';
import Endereco from '../app/models/Endereco';

const models = [User, Endereco];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(DatabaseConfig);

    models.map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}
export default new Database();
