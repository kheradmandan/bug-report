// import Sequelize from 'sequelize';
// import OptionStatusModel from '../models/op-status-model';
// import OptionFlagModel from '../models/op-flag-model';
// import OptionRoleModel from '../models/op-role-model';
// import ProvinceModel from '../models/province-model';
// import CityModel from '../models/city-model';
// import OrganModel from '../models/organ-model';
// import GroupModel from '../models/group-model';
// import AccountModel from '../models/account-model';
// import TaskModel from '../models/task-model';
//
// const sequelize = new Sequelize( 'bug_db', 'morteza', 'rme6843', {
//   "host": "127.0.0.1",
//   "port": 5432,
//   "dialect": "postgres"
// } );
// let db = { sequelize };
//
// sequelize.options.define.underscored = true;
// sequelize.options.define.freezeTableName = true;
//
// // Option tables
// let op_status = OptionStatusModel( Sequelize, sequelize );
// let op_flag = OptionFlagModel( Sequelize, sequelize );
// let op_role = OptionRoleModel( Sequelize, sequelize );
//
// db.op_status = op_status;
// db.op_flag = op_flag;
// db.op_role = op_role;
//
// // Register models-fake
// let province = ProvinceModel( Sequelize, sequelize );
// let city = CityModel( Sequelize, sequelize, province );
// let organ = OrganModel( Sequelize, sequelize, city );
// let group = GroupModel( Sequelize, sequelize, organ, op_status );
// let account = AccountModel( Sequelize, sequelize, op_role, op_status );
// let task = TaskModel( Sequelize, sequelize, account, organ, group, op_status, op_flag );
//
// db.province = province;
// db.city = city;
// db.organ = organ;
// db.account = account;
// db.task = task;
//
// export {
//   Sequelize,
//   db,
//   op_status,
//   op_flag,
//   op_role,
//   sequelize,
//   province,
//   city,
//   organ,
//   account,
//   task
// }

import db from '../models';

export default db;