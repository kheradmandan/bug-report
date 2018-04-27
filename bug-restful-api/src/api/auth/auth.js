const express = require( 'express' );
const router = express.Router();
import { Sequelize, sequelize, account } from '../../data-access/db';
import jwt from 'jsonwebtoken';
import { secretKey } from '../../util/config';

router.post( '/login', login );
// router.post( '/add', add );

module.exports = router;

function login( req, res, next ){

  if ( !req.body.account ) {
    next( { message: 'no data found in request body. body:{modelName:{...fields}}' } );
    return;
  }

  const dataModel = {
    email: req.body.account[ 'email' ] || '',
    password: req.body.account[ 'password' ],
  };

  console.log( 'login', 'dataModel', dataModel );

  if ( !dataModel.email || !dataModel.password ) {
    next( { message: 'no login data found in request body. body:{modelName:{...fields}}' } );
    return;
  }

  const failedMessage = { message: 'login failed <--> wrong data.' };

  sequelize
    .query( 'SELECT check_account_password(:email, :password)', { replacements: dataModel } )

    .then( data =>{
      if ( !data || data.length === 0 || data[ 0 ].length === 0 ) {
        next( failedMessage );
      }
      else {
        const uuid = data[ 0 ][ 0 ][ 'check_account_password' ];
        if ( !uuid || uuid.length === 0 ) {
          next( failedMessage );
        }
        else {
          // generate token ...
          registerAsLogin( uuid, req, res, next );
        }
      }
    } )

    .catch( next );
}

function registerAsLogin( account_id, req, res, next ){

  account.findById( account_id, { attributes: [ 'account_id', 'name', 'family', 'email', 'created_at' ] } )
         .then( data =>{
           const account = data.dataValues;

           const token = {
             token: jwt.sign( account, secretKey )
           };

           // update last login date
           data
             .updateAttributes( { 'last_login_at': new Date() } )

             .then( () =>{
               res.json( token );
             } )

             .catch( next );
         } )

         .catch( next )
}