import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize' ;

const basename = path.basename( __filename );
const env = process.env.NODE_ENV || 'development';
const config = require( '../data-access/config.json' )[ env ];
const db = {};

let sequelize;
if ( config.use_env_variable ) {
  sequelize = new Sequelize( process.env[ config.use_env_variable ], config );
}else {
  sequelize = new Sequelize( config.database, config.username, config.password, config );
}
sequelize.options.define.underscored = true;
sequelize.options.define.freezeTableName = true;

fs
  .readdirSync( __dirname )
  .filter( file => file.endsWith( '-model.js' ) && file.indexOf( '.' ) !== 0 && (file !== basename) )
  .forEach( file =>{
    const model = sequelize.import( path.join( __dirname, file ) );
    db[ model.name ] = model;
  } );

Object.keys( db ).forEach( modelName =>{
  if ( db[ modelName ].associate ) {
    db[ modelName ].associate( db );
  }
} );

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;