import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
import Horario from '../app/models/Horario';
import Token from '../app/models/Token';
import BannerType from '../app/models/Banner_type';
import Banner from '../app/models/Banner';

import Category from '../app/models/Category';
import Product from '../app/models/Product';
import ProductImage from '../app/models/ProductImage';
import ProductVariation from '../app/models/ProductVariation';
import CategoryProduct from '../app/models/CategoryProduct';

const models = [
  User,
  File,
  Appointment,
  Horario,
  Token,
  BannerType,
  Banner,
  Category,
  Product,
  CategoryProduct,
  ProductImage,
  ProductVariation,
];

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);

    this.init();
    this.associate();
    this.mongo();
  }

  init() {
    models.map(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      // console.log('Model>>>: ', model);

      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }

  mongo() {
    const { MONGO_HOST, MONGO_PORT, MONGO_NAME } = process.env;

    const mongoURI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;

    this.mongoConnection = mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
