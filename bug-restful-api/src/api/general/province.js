const express = require( 'express' );
const router = express.Router();
import { Sequelize, province } from '../../models';

router.get( '/list', getList );
router.post( '/add', add );

module.exports = router;

function getList( req, res, next ){
  province.findAll( {} )
          .then( data =>{
            const list = data.map( x => x.dataValues );
            res.send( list );
          } )
          .catch( err =>{
            next( err )
          } );
}

function add( req, res, next ){

  if ( !req.body.province ) {
    next( { message: 'no data found in request body. body:{modelName:{...fields}}' } );
    return;
  }

  const dataModel = {
    name: req.body.province[ 'name' ]
  };

  province
    .create( dataModel )

    .then( x =>{
      res.json( x );
    } )

    .catch( Sequelize.ValidationError, function ( err ){
      next( { message: err.errors.map( x => x.message ).join( ',' ) } );
    } )

    .catch( next );
}