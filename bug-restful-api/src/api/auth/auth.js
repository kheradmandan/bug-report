const express = require( 'express' );
const router = express.Router();
import jwt from 'jsonwebtoken';
import { sequelize, account } from '../../models';
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

  if ( !dataModel.email || !dataModel.password ) {
    next( { message: 'no login data found in request body. body:{modelName:{...fields}}' } );
    return;
  }

  const failedMessage = { message: 'login failed <--> wrong data.' };

  sequelize
    .query( 'SELECT check_account_password(:email, :password)', { replacements: dataModel } )

    .then( x =>{

      if ( !x || x.length === 0 || x[ 0 ].length === 0 ) {
        next( failedMessage );

      }else {

        const uuid = x[ 0 ][ 0 ][ 'check_account_password' ];

        if ( !uuid || uuid.length === 0 ) {
          next( failedMessage );

        }else {
          // generate token ...
          registerAsLogin( uuid, req, res, next );
        }

      }
    } )

    .catch( next );
}

function registerAsLogin( account_id, req, res, next ){

  account
    .findById( account_id, { attributes: [ 'account_uuid', 'name', 'family', 'email', 'created_at' ] } )

    .then( x =>{

      const account = x.dataValues;
      const token = {
        token: jwt.sign( account, secretKey )
      };

      x
        .updateAttributes( { 'last_login_at': new Date() } )

        .then( () =>{
          res.json( token );
        } )

        .catch( next );
    } )

    .catch( next )
}