import Sequelize from 'sequelize';
import ProvinceModel from '../data-model/province-model';

let db = {};

const sequelize = new Sequelize( 'bug_db', 'morteza', 'rme6843', {
  "host": "127.0.0.1",
  "port": 5432,
  "dialect": "postgres"
} );


// Register models
db.province = ProvinceModel( sequelize, Sequelize.DataTypes );

db.sequelize = sequelize;
export {
  db
}
