import Sequelize from 'sequelize';
import ProvinceModel from '../data-model/province-model';
import CityModel from '../data-model/city-model';
import OrganModel from '../data-model/organ-model';
import AccountModel from '../data-model/account-model';


const sequelize = new Sequelize( 'bug_db', 'morteza', 'rme6843', {
  "host": "127.0.0.1",
  "port": 5432,
  "dialect": "postgres"
} );
let db = { sequelize };

// Register models
let province = ProvinceModel( Sequelize, sequelize );
let city = CityModel( Sequelize, sequelize, province );
let organ = OrganModel( Sequelize, sequelize, city );
let account = AccountModel( Sequelize, sequelize );

db.province = province;
db.city = city;
db.organ = organ;
db.account = account;

export {
  Sequelize,
  db,
  sequelize,
  province,
  city,
  organ,
  account,
}
